import { classNames } from '@/helpers/classNames';
import { numberFormat } from '@/helpers/numberFormat';
import { BuildingDetails } from '@/infrastructure/store/api/property/property-type';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { format, parseISO } from 'date-fns';
import React from 'react';
import Accordion from '../../Accordion';

const PropertyDetailAccordion: React.FC<BuildingDetails> = ({
  name,
  projectStatusName,
  turnOverDate,
  yearBuilt,
  telcos,
  tenantMix,
  grossBuildingSize,
  grossLeasableSize,
  typicalFloorPlateSize,
  totalFloors,
}) => {
  return (
    <div className="border border-gray-blue-2 rounded-lg bg-white">
      <Accordion
        defaultOpen
        title="PROPERTY DETAILS"
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 items-center">
            PROPERTY DETAILS
            <ChevronUpIcon className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')} />
          </E>
        )}
      >
        <ul className="mt-2 px-4 pb-4">
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Building name</span>
            <span className="typography-body text-black flex-1">{name}</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Project status</span>
            <span className="typography-body text-black flex-1">{projectStatusName || 'N/A'}</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property type</span>
            {/* TODO: */}
            <span className="typography-body text-black flex-1">{'TODO:'}</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Turn-over Date</span>
            <span className="typography-body text-black flex-1">
              {turnOverDate ? format(parseISO(turnOverDate.toString()), 'MMMM dd, yyyy') : ''}
            </span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Year Built</span>
            <span className="typography-body text-black flex-1">{yearBuilt}</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Telcos</span>
            <span className="typography-body text-black flex-1">{telcos}</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Tenant mix</span>
            <span className="typography-body text-black flex-1">{tenantMix || 'N/A'}</span>
          </li>

          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Classification</span>
            {/* TODO: */}
            <span className="typography-body text-black flex-1">TODO:</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Total Building Size</span>
            <span className="typography-body text-black flex-1">{grossBuildingSize}</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Gross Leasable Area</span>
            <span className="typography-body text-black flex-1">{numberFormat(Number(grossLeasableSize))} sqm</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Typical Floor Plate</span>
            <span className="typography-body text-black flex-1">{numberFormat(Number(typicalFloorPlateSize))} sqm</span>
          </li>
          <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
            <span className="typography-caption flex-1 font-medium text-gray-blue-7">Floor</span>
            <span className="typography-body text-black flex-1">{totalFloors} Floors</span>
          </li>
        </ul>
      </Accordion>
    </div>
  );
};

export default PropertyDetailAccordion;
