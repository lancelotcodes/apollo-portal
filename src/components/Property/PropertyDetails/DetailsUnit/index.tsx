import Button from '@/components/core/Button';
import { classNames } from '@/helpers/classNames';
import { setUnitTabChanged, UnitTabType } from '@/infrastructure/store/features/unit-details/unit-details.slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import React, { lazy, Suspense } from 'react';
import TenantTabDetailsContainer from './TenantTabDetails';

const UnitDetailsComponent = lazy(() => import('@/components/core/UnitDetailsComponent'));

const unitTabs: UnitTabType[] = ['Unit Details', 'Tenant Details'];

const UnitDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state['unit-details'].tab);

  return (
    <>
      <div className="px-2 sm:px-4 border-b border-gray-blue-2">
        <nav className="-mb-px flex gap-1 sm:gap-2" aria-label="Tabs">
          {unitTabs.map((e) => (
            <button
              onClick={() => {
                dispatch(setUnitTabChanged(e));
              }}
              key={e}
              className={classNames(
                'py-2 relative px-2 sm:px-3 rounded-t-lg border-t border-l border-r duration-75 transition-all',
                e === tab ? 'bg-gray-blue-1 border-gray-blue-2' : 'bg-none border-transparent',
              )}
              aria-current={e === tab ? 'page' : undefined}
            >
              <span
                className={classNames(
                  'typography-body font-normal duration-75 transition-color',
                  e === tab ? 'text-black' : 'text-gray-7',
                )}
              >
                {e}

                <span
                  className={classNames(
                    'absolute w-8/12 h-0.5 rounded-full bottom-0 left-1/2 -translate-x-1/2 box-content duration-75 transition-color',
                    e === tab ? 'bg-blue-4' : 'bg-transparent',
                  )}
                />
              </span>
            </button>
          ))}
        </nav>
      </div>

      {tab === 'Unit Details' && (
        <Suspense>
          <UnitDetailsComponent IsUnitTabForm={true} />
        </Suspense>
      )}

      {tab === 'Tenant Details' && (
        <div className="flex flex-col md:flex-row h-full overflow-auto md:overflow-hidden">
          <div className="md:overflow-auto px-2 py-4 pb-2 md:pb-4 w-full space-y-4 md:mb-[72px] md:flex-1">
            {/* <div className="border border-gray-blue-2 rounded-lg bg-white">
              <Accordion
                defaultOpen
                title="PROPERTY DETAILS"
                renderTitle={(E, open) => (
                  <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9">
                    UNIT DETAILS
                    <ChevronUpIcon
                      className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')}
                    />
                  </E>
                )}
              >
                <ul className="mt-2 px-4 pb-4">
                  <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                    <span className="typography-caption flex-1 font-medium text-gray-blue-7">Name</span>
                    <span className="typography-body text-black flex-1">Details</span>
                  </li>
                  <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                    <span className="typography-caption flex-1 font-medium text-gray-blue-7">Commencement Date</span>
                    <span className="typography-body text-black flex-1">Details</span>
                  </li>
                  <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                    <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                      Lease Expiration Date
                    </span>
                    <span className="typography-body text-black flex-1">Details</span>
                  </li>
                  <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                    <span className="typography-caption flex-1 font-medium text-gray-blue-7">Estimated Area</span>
                    <span className="typography-body text-black flex-1">Details</span>
                  </li>
                  <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                    <span className="typography-caption flex-1 font-medium text-gray-blue-7">Agent Company</span>
                    <span className="typography-body text-black flex-1">Details</span>
                  </li>
                  <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                    <span className="typography-caption flex-1 font-medium text-gray-blue-7">Is Historical?</span>
                    <span className="typography-body text-black flex-1">Details</span>
                  </li>
                  <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                    <span className="typography-caption flex-1 font-medium text-gray-blue-7">Classification</span>
                    <span className="typography-body text-black flex-1">Details</span>
                  </li>
                </ul>
              </Accordion>
            </div> */}
            <TenantTabDetailsContainer />
          </div>
        </div>
      )}
      <div className="absolute w-full md:w-[calc(100vw-104px)] bottom-0 right-0 p-4 bg-white border-t border-gray-200">
        <div className="flex justify-between">
          <Button btnType="link" className="text-red hover:text-opacity-90 hover:text-red">
            UNPUBLISH UNIT
          </Button>
          <div className="flex gap-4">
            <Button>VISIT ON WEBSITE</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitDetails;
