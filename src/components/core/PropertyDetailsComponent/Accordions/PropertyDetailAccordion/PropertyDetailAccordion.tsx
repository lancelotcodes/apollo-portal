import React from 'react';
import { PropertyResponse } from '@/infrastructure/store/api/property/property-type';

const PropertyDetailAccordion: React.FC<PropertyResponse> = ({
  name,
  propertyTypeName,
  masterPropertyName,
  contactName,
  ownerName,
  gradeName,
  ownerCompanyName,
  isExclusive,
  note,
}) => {
  return (
    <ul className="mt-2 px-4 pb-4">
      <li className="space-x-1 items-center w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Name</span>
        <span className="typography-body text-black flex-1">{name}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Type</span>
        <span className="typography-body text-black flex-1">{propertyTypeName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Master Property</span>
        {/* TODO: */}
        <span className="typography-body text-black flex-1">{masterPropertyName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Contact</span>
        <span className="typography-body text-black flex-1">{contactName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Owner</span>
        <span className="typography-body text-black flex-1">{ownerName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Grade</span>
        <span className="typography-body text-black flex-1">{gradeName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Owner Company</span>
        <span className="typography-body text-black flex-1">{ownerCompanyName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Is Exclusive?</span>
        <span className="typography-body text-black flex-1">{(isExclusive === true && 'Yes') || 'No'}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Note</span>
        <span className="typography-body text-black flex-1">{note || ''}</span>
      </li>
    </ul>
  );
};

export default PropertyDetailAccordion;
