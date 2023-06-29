import { convertToLocalFormat } from '@/helpers/date-format';
import { numberFormat } from '@/helpers/numberFormat';
import { BuildingUnitById } from '@/infrastructure/store/api/stacking/stacking-types';
import React from 'react';
interface Props {
  unitDetails: BuildingUnitById | undefined;
}
const UnitDetailsAccordion: React.FC<Props> = ({ unitDetails }) => {
  return (
    <ul className="mt-2 px-4 pb-4">
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Name</span>
        <span className="typography-body text-black flex-1">{unitDetails?.name}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Status</span>
        <span className="typography-body text-black flex-1">{unitDetails?.unitStatusName}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Availability</span>
        <span className="typography-body text-black flex-1">{unitDetails?.availabilityName}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Listing Type</span>
        <span className="typography-body text-black flex-1">{unitDetails?.listingTypeName}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Unit Number</span>
        <span className="typography-body text-black flex-1">{unitDetails?.unitNumber}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Floor Area (SQM)</span>
        <span className="typography-body text-black flex-1">
          {unitDetails && numberFormat(Number(unitDetails?.leaseFloorArea))}
        </span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Base Price (PHP)</span>
        <span className="typography-body text-black flex-1">{unitDetails && numberFormat(Number(unitDetails?.basePrice))}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">CUSA (PHP)</span>
        <span className="typography-body text-black flex-1">{`${numberFormat(Number(unitDetails?.cusa))}`}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">AC Charges</span>
        <span className="typography-body text-black flex-1">{unitDetails?.acCharges}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">AC Extension Charges</span>
        <span className="typography-body text-black flex-1">{unitDetails?.acExtensionCharges}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Parking Rent (PHP)</span>
        <span className="typography-body text-black flex-1">{numberFormat(Number(unitDetails?.parkingRent))}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Escalation Rate (%)</span>
        <span className="typography-body text-black flex-1">{`${numberFormat(Number(unitDetails?.escalationRate))}`}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Mininmum Lease Term (Month)</span>
        <span className="typography-body text-black flex-1">{numberFormat(Number(unitDetails?.minimumLeaseTerm))}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Handover Condition</span>
        <span className="typography-body text-black flex-1">{unitDetails?.handOverConditionName}</span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Handover Date</span>
        <span className="typography-body text-black flex-1">
          {unitDetails?.handOverDate && convertToLocalFormat(unitDetails?.handOverDate)}
        </span>
      </li>
      <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
        <span className="typography-caption flex-1 font-medium text-gray-blue-7">Notes</span>
        <span className="typography-body text-black flex-1">
          {unitDetails?.notes || ""}
        </span>
      </li>
    </ul>
  );
};

export default UnitDetailsAccordion;
