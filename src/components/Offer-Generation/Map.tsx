import { OfferOptionResponse } from '@/infrastructure/store/api/offer/offer-type';
import React, { useRef } from 'react';
import { MapRef } from 'react-map-gl';
import Mapbox from '../core/Mapbox';

interface Props {
  searchedPropertyList?: OfferOptionResponse[];
}

const Map: React.FC<Props> = ({ searchedPropertyList }) => {
  const mapRef = useRef<MapRef>(null);

  return (
    <div className="pb-4 w-full lg:w-1/2">
      <section className="border rounded-lg border-gray-blue-2 p-4 space-y-4 flex flex-col">
        <p className="typography-button text-gray-blue-5">PROPERTY MAP</p>

        <Mapbox
          passedRef={mapRef}
          zoom={10}
          mapHeight="h-[400px] lg:h-[735px]"
          propertyList={searchedPropertyList?.map((x) => {
            return {
              id: x.id,
              name: x.name,
              propertyTypeID: x.propertyTypeID,
              propertyTypeName: x.propertyTypeName,
              latitude: x.address.latitude,
              longitude: x.address.longitude,
              cityName: x.address.cityName,
              subMarketName: x.address.subMarketName,
            };
          })}
          // selectedProperty={property.data}
          // selectedPropertyAddress={propertyAddress.data}
        ></Mapbox>
      </section>
    </div>
  );
};

export default Map;
