import {
  PropertyAddress,
  PropertyDetails,
  PropertyResponse,
  SavePropertyLocationRequest,
} from '@/infrastructure/store/api/property/property-type';
import React from 'react';
import { MapRef } from 'react-map-gl';
import Accordion from '../../Accordion';
import Mapbox from '../../Mapbox';

const PropertyMapAccordion: React.FC<{
  propertyAddress?: PropertyAddress | SavePropertyLocationRequest | null;
  property: PropertyDetails | PropertyResponse;
  passedRef?: React.RefObject<MapRef> | null;
}> = ({ property, propertyAddress, passedRef }) => {
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white p-4 space-y-2">
      <Accordion
        defaultOpen
        title="MAP DETAILS"
        titleClassName="w-full typography-button text-gray-blue-5 hover:text-gray-blue-7"
      >
        <div className="h-full w-full">
          <Mapbox
            zoom={7}
            selectedProperty={property}
            selectedPropertyAddress={propertyAddress}
            draggable={false}
            passedRef={passedRef}
            mapHeight="h-[315px]"
          />
        </div>
      </Accordion>
    </div>
  );
};

export default PropertyMapAccordion;
