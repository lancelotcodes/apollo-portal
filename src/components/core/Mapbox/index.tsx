/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  PropertyAddress,
  PropertyDetails,
  PropertyMap,
  PropertyResponse,
  SavePropertyLocationRequest,
} from '@/infrastructure/store/api/property/property-type';
import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import ReactMapboxGl, {
  ViewState,
  Marker,
  Popup,
  MapRef,
  GeolocateControl,
  FullscreenControl,
  MarkerDragEvent,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FCC } from '@/helpers/FCC';
import useSuperCluster from 'use-supercluster';
import { BBox, GeoJsonProperties } from 'geojson';
import Supercluster, { PointFeature } from 'supercluster';
import { classNames } from '@/helpers/classNames';
import '../../../styles/styles.css';
import { LocationIcon, PropertyIcon } from '../Icon';
import Tag from '../Tag';
import { IMAGES } from 'src/assets/images';

const PropertyMarker = lazy(() => import('./MapboxMarker'));
interface Props {
  propertyList?: PropertyMap[];
  selectedProperty?: PropertyDetails | PropertyResponse | null;
  selectedPropertyAddress?: PropertyAddress | SavePropertyLocationRequest | null;
  onPropertyClicked?: (mapRef: React.RefObject<MapRef>, e: PropertyMap) => void;
  zoom?: number;
  passedRef?: React.RefObject<MapRef> | null;
  onMarkerDragEnd?: (e: MarkerDragEvent) => void | undefined;
  draggable?: boolean;
  mapHeight?: string | number;
}

const Mapbox: FCC<Props> = ({
  children,
  propertyList,
  selectedProperty,
  onPropertyClicked,
  selectedPropertyAddress,
  passedRef,
  zoom,
  onMarkerDragEnd,
  draggable,
  mapHeight,
}) => {
  const [hoveredProperty, setHoveredProperty] = useState<Partial<PropertyMap> | null>();
  const TOKEN = import.meta.env.VITE_PORTAL_MAP_BOX_API_KEY;
  const mapRef = useRef<MapRef>(null);
  const mapRefToUse = useMemo(() => passedRef ?? mapRef, [passedRef]);
  const [viewPort, setViewPort] = useState<Partial<ViewState>>({
    latitude: selectedPropertyAddress?.latitude || 14.566849,
    longitude: selectedPropertyAddress?.longitude || 121.007886,
    zoom: zoom ?? 7,
  });

  useEffect(() => {
    if (selectedProperty && selectedPropertyAddress && !draggable) {
      setHoveredProperty({
        name: selectedProperty?.name,
        mainImage: selectedProperty?.mainImage,
        latitude: selectedPropertyAddress?.latitude,
        longitude: selectedPropertyAddress?.longitude,
        cityName: selectedPropertyAddress.cityName,
        subMarketName: selectedPropertyAddress.subMarketName,
        propertyTypeName: selectedProperty.propertyTypeName,
      });
    }
    if (selectedPropertyAddress) {
      setViewPort({
        latitude: selectedPropertyAddress?.latitude,
        longitude: selectedPropertyAddress?.longitude,
        zoom: zoom ?? 7,
      });
    }

    return () => {
      setHoveredProperty(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyList, selectedProperty, selectedPropertyAddress]);

  // Property Points
  const points: Array<PointFeature<GeoJsonProperties & PropertyMap>> = useMemo(
    () =>
      propertyList?.map((data) => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [data.longitude, data.latitude] },
        properties: {
          ...data,
          cluster: false,
        },
      })) ?? [],
    [propertyList],
  );

  const bounds: BBox | undefined = mapRefToUse.current
    ? (mapRefToUse.current.getBounds().toArray().flat() as BBox)
    : undefined;

  // Get Cluster
  const { clusters, supercluster } = useSuperCluster<PropertyMap>({
    points,
    zoom: viewPort.zoom ?? 5,
    bounds,
    options: {
      radius: 25,
      maxZoom: 25,
    },
  });

  return (
    // <div className={`bg-blue-100 z-0 w-full overflow-hidden  h-[${height ?? '500'}px]`}>
    <div className={`bg-blue-100 z-0 w-full overflow-hidden ${mapHeight ? mapHeight : 'h-[100vh]'}`}>
      <ReactMapboxGl
        ref={mapRefToUse}
        {...viewPort}
        attributionControl={false}
        onMove={(e) => setViewPort(e.viewState)}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ height: '100%', zIndex: 0 }}
      >
        <GeolocateControl />
        <FullscreenControl />

        {propertyList && propertyList.length > 0 && (
          <ul>
            {clusters.map((cluster, index) => {
              return (
                <div key={index}>
                  <ClusterMarker
                    id={cluster.id}
                    geometry={cluster.geometry}
                    properties={cluster.properties as Supercluster.ClusterProperties & PropertyMap}
                    type={cluster.type}
                    selectedProperty={selectedProperty}
                    mapRefToUse={mapRefToUse}
                    supercluster={supercluster}
                    onPropertyClicked={onPropertyClicked}
                    setHoveredProperty={setHoveredProperty}
                  />
                </div>
              );
            })}
          </ul>
        )}

        {!propertyList && selectedProperty && selectedPropertyAddress && (
          <Marker
            offset={[0, 0]}
            latitude={selectedPropertyAddress?.latitude}
            longitude={selectedPropertyAddress?.longitude}
            draggable={draggable}
            onDragEnd={onMarkerDragEnd}
          >
            <div className="cursor-pointer">
              <Suspense>
                <PropertyMarker isCluster={false} classification={'Commercial'} isSelected />
              </Suspense>
            </div>
          </Marker>
        )}

        {children}

        {hoveredProperty?.longitude && hoveredProperty?.latitude && (
          <Popup
            focusAfterOpen
            longitude={(hoveredProperty?.longitude ? hoveredProperty?.longitude : selectedPropertyAddress?.longitude)!}
            anchor="bottom"
            offset={[0, hoveredProperty ? -50 : -35]}
            latitude={(hoveredProperty?.latitude ? hoveredProperty?.latitude : selectedPropertyAddress?.latitude)!}
            onClose={() => setHoveredProperty(null)}
            style={{ maxWidth: '350px' }}
          >
            <div className="flex gap-2 items-center">
              <div className="w-20 h-20 bg-gray-2 rounded">
                <img
                  className="h-full w-full border-2 rounded-md"
                  src={
                    (hoveredProperty && hoveredProperty?.mainImage && hoveredProperty.mainImage) || IMAGES.DUMMYPHOTO
                  }
                  alt="Main"
                />
              </div>
              <ul className="flex flex-col justify-between py-2">
                <li className="space-x-1 flex items-center">
                  <Tag type="zoning-commercial" value={hoveredProperty?.propertyTypeName} />
                </li>
                <span className={classNames('font-medium mt-2')}>{hoveredProperty?.name}</span>
                <div className="flex gap-2">
                  <li className="space-x-1 flex items-center">
                    <span className="text-black">
                      {' '}
                      <PropertyIcon />{' '}
                    </span>
                    <span className="font-medium text-gray-blue-6">2019</span>
                    <span className="font-medium text-gray-blue-6">Build</span>
                  </li>
                  <li className="space-x-1 flex items-center">
                    <span className="text-black">
                      {' '}
                      <LocationIcon />{' '}
                    </span>
                    <span className="font-medium text-gray-blue-6">{hoveredProperty?.cityName},</span>
                    <span className="font-medium text-gray-blue-6">{hoveredProperty?.subMarketName}</span>
                  </li>
                </div>
              </ul>
            </div>
          </Popup>
        )}
      </ReactMapboxGl>
    </div>
  );
};

type ClusterPointFeature = PointFeature<Supercluster.ClusterProperties & PropertyMap> &
  Pick<Props, 'onPropertyClicked' | 'selectedProperty'>;

interface ClusterMarkerProps extends ClusterPointFeature {
  mapRefToUse: React.RefObject<MapRef>;
  supercluster?: Supercluster<PropertyMap, Supercluster.AnyProps>;
  setHoveredProperty: React.Dispatch<React.SetStateAction<Partial<PropertyMap> | null | undefined>>;
}

const ClusterMarker: React.FC<ClusterMarkerProps> = ({
  properties,
  geometry,
  id,
  supercluster,
  mapRefToUse,
  onPropertyClicked,
  selectedProperty,
  setHoveredProperty,
}) => {
  const [longitude, latitude] = geometry.coordinates;

  const {
    point_count: pointCount,
    cluster: isCluster,
    cluster_id: _id,
    point_count_abbreviated: _a,
    ...rest
  } = properties!;

  const handleMarkerClicked = (e: PropertyMap) => {
    onPropertyClicked && onPropertyClicked(mapRefToUse, e);
  };

  if (isCluster) {
    return (
      <Marker
        key={_id}
        latitude={latitude}
        longitude={longitude}
        onClick={() => {
          if (_id) {
            const expansionZoom = supercluster?.getClusterExpansionZoom(typeof _id === 'string' ? parseInt(_id) : _id);

            mapRefToUse.current?.flyTo({
              center: [longitude, latitude],
              zoom: expansionZoom,
              speed: 1.3,
            });
            return;
          }
          handleMarkerClicked({ ...(rest as PropertyMap) });
        }}
      >
        <div className="cursor-pointer" onMouseEnter={() => setHoveredProperty({ ...(rest as PropertyMap) })}>
          <Suspense>
            <PropertyMarker count={pointCount} isCluster={isCluster} classification="Commercial" isSelected={false}>
              {pointCount}
            </PropertyMarker>
          </Suspense>
        </div>
      </Marker>
    );
  }

  return (
    <Marker
      key={id}
      offset={[0, -20]}
      latitude={latitude}
      longitude={longitude}
      onClick={() => handleMarkerClicked({ ...(rest as PropertyMap) })}
    >
      <div
        className="cursor-pointer"
        onMouseEnter={() => setHoveredProperty({ ...(rest as PropertyMap) })}
        onMouseLeave={() => !selectedProperty && setHoveredProperty(null)}
      >
        <Suspense>
          <PropertyMarker
            isCluster={isCluster}
            classification={'Commercial'}
            isSelected={selectedProperty ? properties.id === selectedProperty?.id : false}
          />
        </Suspense>
      </div>
    </Marker>
  );
};

export default Mapbox;
