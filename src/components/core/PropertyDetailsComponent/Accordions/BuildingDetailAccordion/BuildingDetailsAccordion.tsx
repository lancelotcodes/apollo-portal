import { convertToLocalFormat } from '@/helpers/date-format';
import { numberFormat } from '@/helpers/numberFormat';
import { BuildingDetails } from '@/infrastructure/store/api/property/property-type';
import React from 'react';

const BuildingDetailsAccordion: React.FC<BuildingDetails> = ({
  name,
  dateBuilt,
  leed,
  turnOverDate,
  tenantMix,
  grossBuildingSize,
  grossLeasableSize,
  typicalFloorPlateSize,
  totalFloors,
  totalUnits,
  efficiencyRatio,
  ceilingHeight,
  minimumLeaseTerm,
  acSystem,
  telcos,
  amenities,
  webPage,
  densityRatio,
  serviceElevator,
  developerName,
  propertyManagementName,
  projectStatusName,
  ownershipTypeName,
  elevators,
  parkingElevator,
  passengerElevator,
}) => {
  return (
    <ul className="mt-2 px-4 pb-4">
      <li className="space-x-1 items-center w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Name</span>
        <span className="typography-body text-black flex-1">{name || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Date Build</span>
        <span className="typography-body text-black flex-1">
          {(dateBuilt && convertToLocalFormat(dateBuilt)) || ''}
        </span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Leed</span>
        <span className="typography-body text-black flex-1">{leed || 0}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Turnover Date</span>
        <span className="typography-body text-black flex-1">
          {(turnOverDate && convertToLocalFormat(turnOverDate)) || ''}
        </span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Tenant Mix</span>
        <span className="typography-body text-black flex-1">{tenantMix || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Gross Building Size (SQM)</span>
        <span className="typography-body text-black flex-1">
          {(grossBuildingSize && numberFormat(Number(grossBuildingSize))) || 0}
        </span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Gross Leasable Size (SQM)</span>
        <span className="typography-body text-black flex-1">
          {(grossLeasableSize && numberFormat(Number(grossLeasableSize))) || ''}
        </span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Typical Floor Plate Size (SQM)</span>
        <span className="typography-body text-black flex-1">
          {(typicalFloorPlateSize && numberFormat(Number(typicalFloorPlateSize))) || ''}
        </span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Total Floors</span>
        <span className="typography-body text-black flex-1">{totalFloors || 0}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Total Units</span>
        <span className="typography-body text-black flex-1">{totalUnits || 0}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Efficiency Ratio (%)</span>
        <span className="typography-body text-black flex-1">{`${efficiencyRatio}` || 0}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Ceiling Height</span>
        <span className="typography-body text-black flex-1">{ceilingHeight || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Minimum Lease Term (Month)</span>
        <span className="typography-body text-black flex-1">{minimumLeaseTerm || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">AC System</span>
        <span className="typography-body text-black flex-1">{acSystem || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Telcos</span>
        <span className="typography-body text-black flex-1">{telcos || ''}</span>
      </li>
      <li className="space-x-1 items-center w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Amenities</span>
        <span className="typography-body text-black flex-1">{amenities || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Web Page</span>
        <span className="typography-body text-black flex-1">{webPage || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Density Ratio (%)</span>
        <span className="typography-body text-black flex-1">{densityRatio || 0}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Developer</span>
        <span className="typography-body text-black flex-1">{developerName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Management</span>
        <span className="typography-body text-black flex-1">{propertyManagementName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Project Status</span>
        <span className="typography-body text-black flex-1">{projectStatusName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Ownership Type</span>
        <span className="typography-body text-black flex-1">{ownershipTypeName || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Elavator</span>
        <span className="typography-body text-black flex-1">{elevators || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Parking Elevator</span>
        <span className="typography-body text-black flex-1">{parkingElevator || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Passenger Elevator</span>
        <span className="typography-body text-black flex-1">{passengerElevator || ''}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Service Elevator</span>
        <span className="typography-body text-black flex-1">{serviceElevator || ''}</span>
      </li>
    </ul>
  );
};

export default BuildingDetailsAccordion;
