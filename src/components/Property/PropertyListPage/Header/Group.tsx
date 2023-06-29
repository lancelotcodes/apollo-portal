import React, { Fragment } from 'react';
import Checkbox from '@/components/core/Checkbox';
import { GroupIcon } from '@/components/core/Icon';
import { classNames } from '@/helpers/classNames';
import { PropertyGroupByMode } from '@/infrastructure/store/features/property-list/property-list-type';
import { Popover, Transition } from '@headlessui/react';
import { FCC } from '@/helpers/FCC';
import { groupByOptions } from '@/constant/GroupByOptions';

interface Props {
  groupBy: {
    City: boolean;
    Submarket: boolean;
    Microdistrict: boolean;
    Project: boolean;
    Class: boolean;
  };
  toggleGroup: (e: PropertyGroupByMode) => void;
}

const Group: FCC<Props> = ({ groupBy, toggleGroup }) => {
  return (
    <Popover className="relative flex">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              'hover:text-black rounded focus:text-black outline-none focus:ring-2',
              open ? 'text-gray-blue-9' : `text-gray-blue-6`,
            )}
          >
            <GroupIcon />
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
            <Popover.Panel className="absolute -left-44 lg :left-0 top-3/4 z-10 mt-3 w-56 transform px-4 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-8 bg-white p-2">
                  <Checkbox title="Group by">
                    <span className="typography-caption text-gray-4">Pick a field to group</span>

                    {groupByOptions.map((e) => (
                      <Checkbox.Item
                        label={e.key}
                        checked={groupBy[e.key]}
                        onChange={() => toggleGroup(e.key)}
                        name={e.key}
                        key={e.key}
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

export default Group;
