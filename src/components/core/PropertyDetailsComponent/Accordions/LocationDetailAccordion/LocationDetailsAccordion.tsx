import React from 'react';
import { PropertyAddress } from '@/infrastructure/store/api/property/property-type';

const LocationDetailsAccordion: React.FC<PropertyAddress> = ({
  latitude,
  longitude,
  subMarketName,
  line1,
  line2,
  cityName,
  zipCode,
  addressTagName,
  polygonPoints,
  microDistrictName,
}) => {
  return (
    <ul className="mt-2 px-4 pb-4">
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">GPS Latitude</span>
        <span className="typography-body text-black flex-1">{latitude || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">GPS Longitude</span>
        <span className="typography-body text-black flex-1">{longitude || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">City/Municipality</span>
        <span className="typography-body text-black flex-1">{cityName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Submarket</span>
        <span className="typography-body text-black flex-1">{subMarketName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Microdistrict</span>
        <span className="typography-body text-black flex-1">{microDistrictName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Zip Code</span>
        <span className="typography-body text-black flex-1">{zipCode || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Address Tag</span>
        <span className="typography-body text-black flex-1">{addressTagName || ''}</span>
      </li>
      <li className="space-x-1 flex items-center items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Address 1</span>
        <span className="typography-body text-black flex-1">{line1 || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Address 2</span>
        <span className="typography-body text-black flex-1">{line2}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Polygon Point</span>
        <span className="typography-body text-black flex-1">{polygonPoints || ''}</span>
      </li>
    </ul>
  );
};

export default LocationDetailsAccordion;
