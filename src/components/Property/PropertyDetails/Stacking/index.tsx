import SwiperSlider from '@/components/core/Slider';
import { FCC } from '@/helpers/FCC';
import { useDialogState } from '@/hooks/useDialogState';
import { useBuildingByIDQuery } from '@/infrastructure/store/api/property/property-api';
import {
  useFloorsByBuildingIdQuery,
  useLazyFloorUnitsByFloorIdQuery,
  useUnitsByBuildingIdQuery,
} from '@/infrastructure/store/api/stacking/stacking-api';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import StackingCard from './Cards/StackingCard';

import { SwiperSlide } from 'swiper/react';
import { Unit } from '@/infrastructure/store/api/stacking/stacking-types';
import { InfoMessages } from '@/constant/InfoMessageOptions';
import Loader from '@/components/core/Loader';
import {
  setSelectedBuildingFloorDetails,
  setSelectedBuildingUnitsDetails,
} from '@/infrastructure/store/features/unit-list/unit-list-slice';

const StackingTable = lazy(() => import('./StackingTable'));
const UnitDetailsDrawer = lazy(() => import('./Drawers/UnitDetailsDrawer'));
const FloorDetailsDrawer = lazy(() => import('./Drawers/FloorDetailsDrawer'));

interface Props {
  propertyId: number;
}

const Stacking: FCC<Props> = ({ propertyId }) => {
  const [drawerUnitDetails, setDrawerUnitDetails] = useState<Unit>();
  const state = useAppSelector((state) => state['property-list']);
  const { stacking } = useAppSelector((state) => state['property-details']);
  const dispatch = useAppDispatch();
  const { paginationIndex } = state;

  const { data: property } = useBuildingByIDQuery(propertyId);
  const { data: buildingFloors, isLoading: isBuildingFloorLoading } = useFloorsByBuildingIdQuery(
    Object.keys(stacking.filterState.leaseExpiration).length !== 0
      ? {
          Id: property?.data?.id,
          param: {
            Status: stacking.filterState.status,
            ExpiryYears: Object.keys(stacking.filterState.leaseExpiration).filter(
              (e) => stacking.filterState.leaseExpiration[e as any],
            ),
            Search: state.search,
          },
        }
      : {
          Id: property?.data?.id,
          param: {
            Status: stacking.filterState.status,
            Search: state.search,
          },
        },
    { refetchOnMountOrArgChange: true },
  );

  const { data: buildingUnits } = useUnitsByBuildingIdQuery(
    Object.keys(stacking.filterState.leaseExpiration).length !== 0
      ? {
          Id: property?.data?.id,
          param: {
            PageNumber: paginationIndex,
            PageSize: 14,
            Search: state.search,
            Status: stacking.filterState.status,
            ExpiryYears: Object.keys(stacking.filterState.leaseExpiration).filter(
              (e) => stacking.filterState.leaseExpiration[e as any],
            ),
          },
        }
      : {
          Id: property?.data?.id,
          param: {
            PageNumber: paginationIndex,
            PageSize: 14,
            Search: state.search,
            Status: stacking.filterState.status,
          },
        },
  );

  const [triggerFloorUnit, { data: floorBuilding, isLoading: isBuildingFloors }] = useLazyFloorUnitsByFloorIdQuery();
  const { viewMode, sort } = useAppSelector((app) => app['property-details'].stacking);
  const sortedBuildingFloors =
    sort === 'asc'
      ? buildingFloors?.data?.slice().sort((a, b) => {
          return a.sort - b.sort;
        })
      : buildingFloors?.data?.slice().sort((a, b) => {
          return b.sort - a.sort;
        });
  const {
    isOpen: unitDrawerOpen,
    setCloseDialog: setCloseUnitDrawer,
    setOpenDialog: setOpenUnitDrawer,
  } = useDialogState();

  const {
    isOpen: floorDrawerOpen,
    setCloseDialog: setCloseFloorDrawer,
    setOpenDialog: setOpenFloorDrawer,
  } = useDialogState();

  const handleOpenFloorDrawer = (id: number | string) => {
    triggerFloorUnit(id);
    setOpenFloorDrawer();
  };
  const handleOpenUnitDetailDrawer = (unit: Unit) => {
    setDrawerUnitDetails(unit);
    setOpenUnitDrawer();
  };
  useEffect(() => {
    if (buildingFloors && buildingUnits) {
      dispatch(setSelectedBuildingFloorDetails(buildingFloors?.data));
      dispatch(setSelectedBuildingUnitsDetails(buildingUnits?.data?.items));
    }
  }, [dispatch, buildingFloors, buildingUnits]);

  const loading = isBuildingFloorLoading;

  return (
    <>
      {property && (
        <>
          <Suspense fallback={null}>
            <UnitDetailsDrawer
              unitDetails={drawerUnitDetails}
              closeDrawer={setCloseUnitDrawer}
              isOpen={unitDrawerOpen}
            />
          </Suspense>

          <Suspense fallback={null}>
            <FloorDetailsDrawer
              floorBuilding={floorBuilding?.data}
              closeDrawer={setCloseFloorDrawer}
              isOpen={floorDrawerOpen}
              isBuildingFloors={isBuildingFloors}
            />
          </Suspense>
        </>
      )}

      {viewMode === 'list' && buildingUnits ? (
        <Suspense>
          <StackingTable {...buildingUnits?.data} />
        </Suspense>
      ) : (
        <div className="px-4 space-y-4">
          {loading && <Loader />}
          {buildingFloors && buildingFloors.data && buildingFloors.data.length === 0 && (
            <div className="flex justify-center">
              <p>{InfoMessages.DataNotFound}</p>
            </div>
          )}
          {sortedBuildingFloors &&
            sortedBuildingFloors?.map((floor) => {
              if (floor.units.length !== 0) {
                return (
                  <div className="stacking-container gap-4 overflow-auto" key={floor?.id}>
                    {/* Floor Number */}
                    <button onClick={() => handleOpenFloorDrawer(floor?.id)}>
                      <div className="p-4 stacking-floor cursor-pointer flex items-center justify-center">
                        <h3 className="cursor-pointer font-bold text-gray-blue-9">{floor.name}</h3>
                      </div>
                    </button>
                    <div className="flex gap-4">
                      {floor.units && floor.units.length <= 2 && (
                        <React.Fragment>
                          {floor.units &&
                            floor.units.map((unit) => (
                              <StackingCard
                                key={unit?.id}
                                unitDetail={unit}
                                type={unit?.unitStatusName}
                                tenantClassification={unit?.tenantClassification}
                                unitNumber={unit?.unitNumber}
                                unitSize={unit?.leaseFloorArea}
                                minimumLease={unit?.minimumLeaseTerm}
                                onView={handleOpenUnitDetailDrawer}
                              />
                            ))}
                        </React.Fragment>
                      )}
                      {floor.units && floor.units.length > 2 && (
                        <SwiperSlider withOutSideArrow={true}>
                          {floor.units &&
                            floor.units.map((unit) => (
                              <SwiperSlide key={unit?.id}>
                                <StackingCard
                                  type={unit?.unitStatusName}
                                  unitNumber={unit?.unitNumber}
                                  unitSize={unit?.leaseFloorArea}
                                  minimumLease={unit?.minimumLeaseTerm}
                                  lastVarified={unit?.endDate}
                                  // onView={setOpenUnitDrawer}
                                  IsSlider={true}
                                  unitDetail={unit}
                                  onView={handleOpenUnitDetailDrawer}
                                />
                              </SwiperSlide>
                            ))}
                        </SwiperSlider>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })}
        </div>
      )}
    </>
  );
};

export default Stacking;
