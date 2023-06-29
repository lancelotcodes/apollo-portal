import {
  usePropertyAddressByIDQuery,
  usePropertyByIDQuery,
  usePropertyMapQuery,
} from '@/infrastructure/store/api/property/property-api';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Layer, MapRef, Source } from 'react-map-gl';
import * as turf from '@turf/turf';

const Mapbox = lazy(() => import('@/components/core/Mapbox'));

const circle = (long: number, lat: number, rad: number) =>
  turf.circle([long, lat], rad, {
    steps: 50,
    units: 'kilometers',
    properties: { foo: 'bar' },
  });

const line = (long: number, lat: number, rad: number) =>
  turf.lineString([...circle(long, lat, rad).geometry.coordinates[0]]);

// const radiusToZoom: Record<number, number> = {
//   5: 11.5,
//   10: 10.5,
//   15: 9.9,
//   20: 9.5,
//   25: 9.1,
// };

const MarketSearchMap = () => {
  const { propertyId, radius } = useAppSelector((app) => app['property-search'].search);

  const { data: property } = usePropertyByIDQuery(propertyId, {
    skip: typeof propertyId !== 'number',
  });

  const { data: propertyList } = usePropertyMapQuery({});

  const { data: propertyAddress } = usePropertyAddressByIDQuery(propertyId, {
    skip: typeof propertyId !== 'number',
  });

  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (
      (radius && property?.success && mapRef.current && propertyAddress?.data.longitude, propertyAddress?.data.latitude)
    ) {
      mapRef.current?.flyTo({
        center: [propertyAddress?.data.longitude, propertyAddress?.data.latitude],
        duration: 2000,
        curve: 2,
      });
    }
  }, [radius, property?.data, property?.success, propertyAddress?.data.longitude, propertyAddress?.data.latitude]);

  if (!property?.success) {
    return null;
  }

  return (
    <section className="border rounded-lg border-gray-blue-2 p-4 space-y-4 flex flex-col mx-4">
      <p className="typography-button text-gray-blue-5">PROPERTY MAP</p>

      {propertyAddress?.data.longitude && propertyAddress?.data.latitude && (
        <Suspense>
          <Mapbox
            passedRef={mapRef}
            zoom={20}
            selectedProperty={property.data}
            selectedPropertyAddress={propertyAddress.data}
            propertyList={propertyList?.data}
          >
            {radius && (
              <>
                <Source
                  id="property"
                  type="geojson"
                  data={circle(propertyAddress?.data.longitude, propertyAddress?.data.latitude, radius)}
                >
                  <Layer
                    id="point-90-hi"
                    type="fill"
                    paint={{
                      'fill-color': '#9CBDF0',
                      'fill-opacity': 0.32,
                      'fill-outline-color': 'blue',
                    }}
                  />
                  <p>asdass</p>
                </Source>
                <Source
                  id="property"
                  type="geojson"
                  data={line(propertyAddress.data.longitude, propertyAddress.data.latitude, radius)}
                >
                  <Layer
                    id="point-9-hi"
                    type="line"
                    paint={{
                      'line-color': 'black',
                      'line-opacity': 0.4,
                      'line-width': 2,
                      'line-dasharray': [20, 20],
                    }}
                  />
                </Source>
              </>
            )}
          </Mapbox>
        </Suspense>
      )}
    </section>
  );
};

export default MarketSearchMap;
