import { PropertyAddress, PropertyDetails } from '@/infrastructure/store/api/property/property-type';
import React from 'react';
import Accordion from '../../Accordion';
import Mapbox from '../../Mapbox';

const PropertyMapAccordion: React.FC<{ propertyAddress: PropertyAddress; property: PropertyDetails }> = ({
  property,
  propertyAddress,
}) => {
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white p-4 space-y-2">
      <Accordion
        defaultOpen
        title="MAP DETAILS"
        titleClassName="w-full typography-button text-gray-blue-5 hover:text-gray-blue-7"
      >
        <div className="h-80 w-full">
          <Mapbox zoom={15} selectedProperty={property} selectedPropertyAddress={propertyAddress} />
        </div>
      </Accordion>
    </div>
  );
};

export default PropertyMapAccordion;
