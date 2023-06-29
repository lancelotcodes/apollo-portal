import React, { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropertyDrawer from './PropertyDrawer';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import Mapbox from '@/components/core/Mapbox';
import { MapRef } from 'react-map-gl';
import { PropertyMap as PropertyMapType } from '@/infrastructure/store/api/property/property-type';
import { useSelectedProperty } from '@/hooks/useSelectedProperty';
import { usePropertyMapQuery } from '@/infrastructure/store/api/property/property-api';
import { setSelectedPropertyInfo } from '@/infrastructure/store/features/property-list/property-list-slice';

interface Props {
  showSelectedProperty?: boolean;
}

const PropertyMap: React.FC<Props> = ({ showSelectedProperty = true }) => {
  const { data: properties } = usePropertyMapQuery({});

  const { selectedPropertyInfo, selectedPropertyAddress } = useAppSelector((app) => app['property-list']);
  const [selectedPropertyID, setselectedPropertyID] = useState<number | null>(null);

  useSelectedProperty(selectedPropertyID);
  const dispatch = useAppDispatch();

  const handleMarkerClicked = (mapRef: React.RefObject<MapRef>, e: PropertyMapType) => {
    if (selectedPropertyInfo?.id !== e.id) {
      setselectedPropertyID(e.id);
    }

    if (e.longitude && e.latitude) {
      mapRef.current?.flyTo({
        center: [e.longitude, e.latitude],
        duration: 2000,
        zoom: 18,
        curve: 2,
      });
    }
  };

  return (
    <Mapbox
      zoom={selectedPropertyInfo ? 10 : undefined}
      propertyList={properties?.data}
      selectedProperty={selectedPropertyInfo}
      selectedPropertyAddress={selectedPropertyAddress}
      onPropertyClicked={handleMarkerClicked}
    >
      {!!selectedPropertyInfo && showSelectedProperty && (
        <PropertyDrawer closeDrawer={() => dispatch(setSelectedPropertyInfo(null))} />
      )}
    </Mapbox>
  );
};

export default PropertyMap;
