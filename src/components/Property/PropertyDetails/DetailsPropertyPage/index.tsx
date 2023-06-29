import AlertBox from '@/components/core/Alert';
import { classNames } from '@/helpers/classNames';
import { useDialogState } from '@/hooks/useDialogState';
import { appApi } from '@/infrastructure/store/api';
import {
  propertyTabChanged,
  PropertyTabType,
} from '@/infrastructure/store/features/property-details/property-details.slice';
import { setSelectedUnitTableData } from '@/infrastructure/store/features/unit-list/unit-list-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import React, { lazy, Suspense, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Controls from '../Stacking/Controls';

const Stacking = lazy(() => import('../Stacking'));
const PropertyDetailsComponent = lazy(() => import('@/components/core/PropertyDetailsComponent'));

const propertyTabs: PropertyTabType[] = ['Property Details', 'Stacking Plan', 'Leads'];

const PropertyDetailsPage: React.FC = () => {
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const { selectedUnitTableData } = useAppSelector((state) => state['unit-list']);
  const [selectedTabName, setSelectedTabName] = useState<PropertyTabType>('Property Details');

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { tab: propertyTab, stacking } = useAppSelector((state) => state['property-details']);

  // Get property related data from the store
  const {
    selectedPropertyInfo,
    selectedPropertyAgents,
    selectedProperty,
    selectedPropertyAddress,
    selectedPropertySEO,
    selectedPropertyVideo,
    selectedPropertyDocuments,
    selectedPropertyMandate,
  } = useAppSelector((app) => app['property-list']);
  const { selectedBuildingFloorDetails } = useAppSelector((state) => state['unit-list']);

  // Close alert which is showing that stacking inline table editing is not saved
  const handleLineEditAlertChange = () => {
    dispatch(appApi.util.invalidateTags([{ type: 'Stacking', id: 'Building-Units' }]));
    dispatch(setSelectedUnitTableData([]));
    setCloseDialog();
    dispatch(propertyTabChanged({ tab: selectedTabName }));
  };

  // Function use to change tab & show alert if stacking inline table editing is not saved
  const handleTabChange = (tab: PropertyTabType) => {
    setSelectedTabName(tab);
    !selectedUnitTableData || selectedUnitTableData.filter((x) => x.isUpdated === true).length === 0
      ? dispatch(propertyTabChanged({ tab }))
      : setOpenDialog();
    location &&
      location.state &&
      location.state.defaultTab === 'Stacking Plan' &&
      navigate(`/property/${params?.propertyId}`, { replace: true });
  };
  return (
    <>
      <div className="px-2 sm:px-4 border-b border-gray-blue-2">
        <nav className="-mb-px flex gap-1 sm:gap-2" aria-label="Tabs">
          {propertyTabs.map((tab) => {
            if (tab == 'Stacking Plan' && !selectedPropertyInfo?.propertyTypeName.includes('Building')) {
              return null;
            } else {
              return (
                <button
                  onClick={() => handleTabChange(tab)}
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
              );
            }
          })}
        </nav>
      </div>

      {propertyTab === 'Stacking Plan' &&
        selectedProperty &&
        selectedPropertyInfo?.propertyTypeName.includes('Building') && (
          <>
            {Object.keys(stacking.selectedUnitId).length < 1 && (
              <Controls
                totalFloorCount={Math.max(
                  ...selectedBuildingFloorDetails.map(function (o) {
                    return o.sort;
                  }),
                )}
              />
            )}

            {params?.propertyId && (
              <div className="overflow-auto pb-5">
                <Suspense>
                  <Stacking propertyId={parseInt(params?.propertyId)} />
                </Suspense>
              </div>
            )}
          </>
        )}

      {propertyTab === 'Property Details' && selectedPropertyInfo && (
        <Suspense>
          <PropertyDetailsComponent
            isTabForm={true}
            propertyInfo={selectedPropertyInfo}
            propertyAgents={selectedPropertyAgents}
            property={selectedProperty}
            propertyAddress={selectedPropertyAddress}
            propertySEO={selectedPropertySEO}
            propertyVideo={selectedPropertyVideo}
            propertyDocuments={selectedPropertyDocuments}
            propertyMandate={selectedPropertyMandate}
          />
        </Suspense>
      )}
      <AlertBox
        dialogTitle={'Edit Units'}
        isDialogOpen={isOpen}
        handleCloseDialog={setCloseDialog}
        handleConfirmDialog={handleLineEditAlertChange}
      >
        {'Are you sure you want to leave, you will lose your data if you continue!'}
      </AlertBox>
    </>
  );
};

export default PropertyDetailsPage;
