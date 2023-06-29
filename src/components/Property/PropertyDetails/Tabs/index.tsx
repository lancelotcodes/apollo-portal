import { classNames } from '@/helpers/classNames';
import {
  propertyTabChanged,
  PropertyTabType,
} from '@/infrastructure/store/features/property-details/property-details.slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import React from 'react';

const propertyTabs: PropertyTabType[] = ['Property Details', 'Stacking Plan', 'Leads'];
const unitTabs = ['Unit Details', 'Tenant Details'];

const Tabs: React.FC<{ type: 'unit' | 'property' }> = ({ type }) => {
  const propertyTab = useAppSelector((state) => state['property-details'].tab);
  const dispatch = useAppDispatch();

  return (
    <div className="px-2 sm:px-4 border-b border-gray-blue-2">
      <nav className="-mb-px flex gap-1 sm:gap-2" aria-label="Tabs">
        {(type === 'unit' ? unitTabs : propertyTabs).map((tab) => (
          <button
            onClick={() => dispatch(propertyTabChanged({ tab: tab as PropertyTabType }))}
            key={tab}
            className={classNames(
              'py-2 relative px-2 sm:px-3 rounded-t-lg border-t border-l border-r duration-75 transition-all',
              propertyTab === tab ? 'bg-gray-blue-1 border-gray-blue-2' : 'bg-none border-transparent',
            )}
            aria-current={propertyTab === tab ? 'page' : undefined}
          >
            <span
              className={classNames(
                'typography-body font-normal duration-75 transition-color',
                propertyTab === tab ? 'text-black' : 'text-gray-7',
              )}
            >
              {tab}

              <span
                className={classNames(
                  'absolute w-8/12 h-0.5 rounded-full bottom-0 left-1/2 -translate-x-1/2 box-content duration-75 transition-color',
                  propertyTab === tab ? 'bg-blue-4' : 'bg-transparent',
                )}
              />
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
