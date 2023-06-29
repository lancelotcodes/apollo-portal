import Checkbox from '@/components/core/Checkbox';
import { SortIcon } from '@/components/core/Icon';
import { sortByOptions } from '@/constant/SortByOptions';
import { classNames } from '@/helpers/classNames';
import { PropertySortByMode } from '@/infrastructure/store/features/property-list/property-list-type';
import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface SortProps {
  sortBy: { [key in PropertySortByMode as string]: boolean };
  toggleSort: (e: PropertySortByMode) => void;
}

const Sort: React.FC<SortProps> = ({ sortBy, toggleSort }) => {
  return (
    <Popover className="relative flex">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              'relative hover:text-black rounded focus:text-black p-2 outline-none focus:ring-2',
              open ? 'text-gray-blue-9' : `text-gray-blue-6`,
            )}
          >
            <SortIcon />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-50"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute -left-44 lg:left-0 top-8 z-10 mt-3 w-56 transform px-4 sm:px-0">
              <div className="overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-2">
                  <Checkbox title="Sort by">
                    {sortByOptions.map((e) => (
                      <Checkbox.Item
                        key={e.key}
                        checked={sortBy[e.key]}
                        onChange={() => toggleSort(e.key)}
                        label={e.title}
                        name={e.key}
                      />
                    ))}
                  </Checkbox>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Sort;
