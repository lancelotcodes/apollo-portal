import Accordion from '@/components/core/Accordion';
import { classNames } from '@/helpers/classNames';
import { useBuildingByIDQuery, usePropertyAddressByIDQuery } from '@/infrastructure/store/api/property/property-api';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { ChevronUpIcon } from '@heroicons/react/solid';
import React from 'react';

const PropertyDetails = () => {
  const propertyId = useAppSelector((app) => app['property-search'].search?.propertyId);

  const { data: property } = useBuildingByIDQuery(propertyId, {
    skip: typeof propertyId !== 'number',
  });

  const { data: propertyAddress } = usePropertyAddressByIDQuery(propertyId, {
    skip: typeof propertyId !== 'number',
  });

  if (!property) {
    return null;
  }

  return (
    <section className="border border-gray-blue-2 rounded-lg bg-white mx-4">
      <Accordion
        defaultOpen
        title="PROPERTY DETAILS"
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 items-center">
            {property.data.name.toUpperCase()}
            <ChevronUpIcon className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')} />
          </E>
        )}
      >
        <div className="px-4 pb-4 space-y-4">
          <p className="typography-button text-gray-blue-5"></p>
          <h3 className="font-bold">Property Details</h3>

          <div className="flex gap-4">
            <div className="self-stretch w-[320px] bg-gray-blue-3 rounded"></div>

            <ul className="flex-1">
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Name</span>
                <span className="typography-body text-black flex-1">{property.data.name}</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">ID</span>
                <span className="typography-body text-black flex-1">{property.data.propertyID}</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Listing Agent</span>
                <span className="typography-body text-black flex-1">{property.data.name}</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Region</span>
                <span className="typography-body text-black flex-1">{propertyAddress?.data.addressTagName}</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Provinces</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">City</span>
                <span className="typography-body text-black flex-1">{propertyAddress?.data.cityName}</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Listing Type</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Type</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Sub Type</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
            </ul>

            <ul className="flex-1">
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Lot Area</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Floor Area</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Leasable Area</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                  Gross Selling Price / SQM
                </span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Net Selling Price / SQM</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Lease Rate / SQM</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
            </ul>
          </div>
        </div>
      </Accordion>
    </section>
  );
};

export default PropertyDetails;
