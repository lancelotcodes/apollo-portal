import AlertBox from '@/components/core/Alert';
import Button from '@/components/core/Button';
import Checkbox from '@/components/core/Checkbox';
import { AddIcon, FilterIcon, SearchIcon, SortIcon, SummaryIcon, TableIcon } from '@/components/core/Icon';
import { StackingIcon } from '@/components/core/Icon/app-wide/StackingIcon';
import IconButton from '@/components/core/IconButton';
import Loader from '@/components/core/Loader';
import CustomSelect from '@/components/core/NewSelect';
import { HandleNotification } from '@/components/core/ToastAlert';
import { SessionOptions } from '@/constant/SessionOptions';
import { stackingSortOptions } from '@/constant/SortByOptions';
import { UnitStatusType } from '@/constant/UnitStatusType';
import { classNames } from '@/helpers/classNames';
import { FCC } from '@/helpers/FCC';
import { numberFormat } from '@/helpers/numberFormat';
import { SessionUtils } from '@/helpers/session-storage';
import useDebounce from '@/hooks/useDebounce';
import { useDialogState } from '@/hooks/useDialogState';
import useWindowSize from '@/hooks/useWindowSize';
import { EndPoint } from '@/infrastructure/store/api/axios/end-points';
import { ExportFile } from '@/infrastructure/store/api/axios/file-api';
import {
  useSaveUnitsMutation,
  useStackingPlanSummaryBuildingIdQuery,
} from '@/infrastructure/store/api/stacking/stacking-api';
import { UnitsByBuildingId } from '@/infrastructure/store/api/stacking/stacking-types';
import {
  setStackingState,
  StackingViewMode,
  toggleCreateFloorDialog,
  toggleFilterDialog,
  toggleImportStackingPlanDialog,
  toggleSummary,
} from '@/infrastructure/store/features/property-details/property-details.slice';
import { setSearchValue } from '@/infrastructure/store/features/property-list/property-list-slice';
import { setSelectedUnitTableData } from '@/infrastructure/store/features/unit-list/unit-list-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { Popover, Transition } from '@headlessui/react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { Fragment, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { SingleValue } from 'react-select';
import SummaryCard from './Cards/SummaryCard';
import ImportStackingPlan from './Dialogs/ImportStackingPlan';

const FilterDialog = lazy(() => import('./Dialogs/FilterDialog'));
const CreateFloorForm = lazy(() => import('./Dialogs/CreateFloorDialog'));

const stackingViewOptions: {
  key: StackingViewMode;
  icon: () => JSX.Element;
}[] = [
  { key: 'stacking', icon: StackingIcon },
  { key: 'list', icon: TableIcon },
];

interface Props {
  totalFloorCount: number;
}

const Controls: FCC<Props> = ({ totalFloorCount }) => {
  const { width } = useWindowSize();
  const { isOpen, setCloseDialog, setOpenDialog } = useDialogState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(search, 500);
  const { viewMode, sort, openSummary } = useAppSelector((state) => state['property-details'].stacking);
  const { selectedProperty } = useAppSelector((state) => state['property-list']);
  const { selectedBuildingUnitsDetails, selectedUnitTableData } = useAppSelector((state) => state['unit-list']);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: summaryList } = useStackingPlanSummaryBuildingIdQuery(selectedProperty?.id ?? skipToken);

  const [saveUnits, { isLoading: isSaveUnitLoading }] = useSaveUnitsMutation();

  const handleImportExportStacking = async (e: SingleValue<{ name: string; value: string }>) => {
    if (e?.value === 'import') {
      dispatch(toggleImportStackingPlanDialog(true));
    } else if (e?.value === 'export' && selectedProperty) {
      setLoading(true);
      await ExportFile(`${EndPoint.EXPORTSTACKINGPLAN}${selectedProperty?.id}`);
      setLoading(false);
    }
  };
  const handleSetSearchValue = useCallback(
    (e: string) => {
      dispatch(setSearchValue(e));
    },
    [dispatch],
  );
  useEffect(() => {
    handleSetSearchValue(debouncedValue);
  }, [debouncedValue, handleSetSearchValue]);

  // Saving Table Inline Edited Unit Details
  const handleInlineRowPayload = async () => {
    const filterRows = selectedUnitTableData?.filter((x) => x.isUpdated === true);

    const arrayComprison = (a: UnitsByBuildingId[], b: UnitsByBuildingId[]) => {
      let result = false;

      for (let i = 0; i < a.length; i++) {
        const unit = b.find((x) => x.id === a[i].id);
        if (unit && a[i].unitStatusName !== unit.unitStatusName) {
          return (result = unit.unitStatusName === UnitStatusType.tenanted ? true : false);
        }
      }
      return result;
    };
    const isTenantedToVacant: boolean = arrayComprison(filterRows, selectedBuildingUnitsDetails);
    if (isTenantedToVacant === true) {
      setOpenDialog();
    } else {
      handleInlineRowSubmit();
    }
  };
  const handleInlineRowSubmit = async () => {
    const filterRows = selectedUnitTableData?.filter((x) => x.isUpdated === true);

    const payload = filterRows.map((y) => {
      return {
        id: y.id,
        unitNumber: y.unitNumber,
        floorID: y.floorID,
        unitStatusID: y.unitStatusID,
        listingTypeID: y.listingTypeID,
        availabilityID: y.availabilityID,
        handOverConditionID: y.handOverConditionID,
        leaseFloorArea: y.leaseFloorArea,
        basePrice: y.basePrice,
        cusa: y.cusa,
        acCharges: y.acCharges,
        acExtensionCharges: y.acExtensionCharges,
        escalationRate: y.escalationRate,
        minimumLeaseTerm: y.minimumLeaseTerm,
      };
    });

    setCloseDialog();
    const res = await saveUnits({ units: payload }).unwrap();
    dispatch(setSelectedUnitTableData([]));
    res && HandleNotification(res.message, res.success);
  };

  return (
    <>
      <div>
        <div className="p-4 flex flex-col lg:flex-row justify-between bg-gray-blue-1 gap-2">
          <div className={classNames('flex gap-2 items-center', isSearching ? 'w-full' : '')}>
            {!isSearching ? (
              <IconButton onClick={() => setIsSearching(!isSearching)} className="p-1 sm:p-2 text-gray-blue-6">
                <SearchIcon />
              </IconButton>
            ) : (
              <div className="w-full self-center flex-1">
                <div className="flex items-center xl:px-0 h-[40px] lg:h-[42px]">
                  <div className="w-full">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-2 flex items-center text-gray-400">
                        <SearchIcon aria-hidden="true" />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full border border-gray-300 rounded py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-blue-7 focus:border-gray-blue-7 sm:text-sm"
                        placeholder="Search"
                        onChange={({ currentTarget }) => setSearch(currentTarget.value)}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/3">
                        <IconButton onClick={() => setIsSearching(!isSearching)} className="text-gray-blue-8">
                          <IoMdClose className="h-5 w-5" />
                        </IconButton>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!isSearching && (
              <>
                <IconButton
                  onClick={() => {
                    dispatch(toggleFilterDialog(true));
                  }}
                  className="p-1 sm:p-2 text-gray-blue-6"
                >
                  <FilterIcon />
                </IconButton>

                <IconButton
                  onClick={() => dispatch(toggleSummary())}
                  className={classNames('p-1 sm:p-2', openSummary ? 'text-gray-9' : 'text-gray-blue-6')}
                >
                  <SummaryIcon />
                </IconButton>

                <Popover className="relative flex">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          'relative hover:text-black rounded focus:text-black p-1 sm:p-2 outline-none focus:ring-2',
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
                                {stackingSortOptions(totalFloorCount).map((e) => (
                                  <Checkbox.Item
                                    key={e.key}
                                    checked={sort === e.key}
                                    onChange={() => dispatch(setStackingState({ sort: e.key }))}
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
              </>
            )}
          </div>
          {((!isSearching && width >= 1024) || width < 1024) && (
            <>
              <div className="flex gap-4 items-center">
                <div className="gap-2 flex self-center">
                  {viewMode === 'list' && (
                    <span className="lg:hidden ml-auto">
                      <Button
                        btnType="secondary-gray"
                        className="w-1/2 w-auto disabled:!bg-gray-2"
                        onClick={handleInlineRowPayload}
                        disabled={
                          (selectedUnitTableData === undefined ||
                            selectedUnitTableData.filter((x) => x.isUpdated === true).length === 0) &&
                          true
                        }
                      >
                        Save Changes
                      </Button>
                    </span>
                  )}
                  <span className="lg:hidden ml-auto">
                    <Button
                      btnType="secondary-gray"
                      icon={<AddIcon />}
                      onClick={() => {
                        SessionUtils.removeItem(SessionOptions.unitId);
                        SessionUtils.removeItem(SessionOptions.propertyId);
                        SessionUtils.setItem(SessionOptions.buildingId, selectedProperty?.id);
                        navigate(pathname + '/unit/create');
                      }}
                    >
                      CREATE NEW UNIT
                    </Button>
                  </span>
                  <span className="lg:hidden ml-auto">
                    <Button
                      btnType="secondary-gray"
                      icon={<AddIcon />}
                      onClick={() => dispatch(toggleCreateFloorDialog(true))}
                    >
                      CREATE FLOOR
                    </Button>
                  </span>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                {viewMode === 'list' && (
                  <span className="hidden lg:inline">
                    <Button
                      btnType="secondary-gray"
                      className="w-1/2 sm:w-auto disabled:!bg-gray-2"
                      onClick={handleInlineRowPayload}
                      disabled={
                        (selectedUnitTableData === undefined ||
                          selectedUnitTableData.filter((x) => x.isUpdated === true).length === 0) &&
                        true
                      }
                    >
                      Save Changes
                    </Button>
                    {isSaveUnitLoading && (
                      <div className="fixed inset-0 bg-black bg-opacity-30 opacity-100 flex items-center z-10">
                        <Loader />
                      </div>
                    )}
                    <AlertBox
                      dialogTitle={'Status Update'}
                      isDialogOpen={isOpen}
                      handleCloseDialog={setCloseDialog}
                      handleConfirmDialog={handleInlineRowSubmit}
                    >
                      {'Changing the status to vacant will result in updating the Tenant record into historical data'}
                    </AlertBox>
                  </span>
                )}
                <span className="hidden lg:inline">
                  <Button
                    btnType="secondary-gray"
                    icon={<AddIcon />}
                    onClick={() => {
                      SessionUtils.removeItem(SessionOptions.unitId);
                      SessionUtils.removeItem(SessionOptions.propertyId);
                      SessionUtils.setItem(SessionOptions.buildingId, selectedProperty?.id);
                      navigate(pathname + '/unit/create');
                    }}
                  >
                    CREATE NEW UNIT
                  </Button>
                </span>
                <span className="hidden lg:inline">
                  <Button
                    btnType="secondary-gray"
                    icon={<AddIcon />}
                    onClick={() => dispatch(toggleCreateFloorDialog(true))}
                  >
                    CREATE FLOOR
                  </Button>
                </span>

                <div className="w-full lg:w-auto">
                  <CustomSelect
                    options={[
                      { name: 'Import Stacking Plan', value: 'import' },
                      { name: 'Export Stacking Plan', value: 'export' },
                    ]}
                    placeholder="Manage Stacking Plan"
                    onChange={handleImportExportStacking}
                    controlContainerHeight="41px"
                  />
                </div>
                {loading && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 opacity-100 flex items-center z-10">
                    <Loader />
                  </div>
                )}

                <div className="gap-2 flex self-center">
                  {stackingViewOptions.map((e) => (
                    <IconButton
                      bordered
                      className={classNames(
                        'p-2',
                        viewMode === e.key ? 'text-black border-black' : 'text-gray-blue-6 border-gray-6',
                      )}
                      key={e.key}
                      onClick={() => dispatch(setStackingState({ viewMode: e.key }))}
                    >
                      <e.icon />
                    </IconButton>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {openSummary && (
          <section className="px-4 mb-5 overflow-hidden">
            <div className="flex gap-4 overflow-auto pb-2">
              {summaryList?.data &&
                summaryList?.data
                  .slice()
                  .sort((a, b) => {
                    const order: string[] = ['Vacant', 'NotVerified']; // high priority items towards end.
                    if (a.expiryYear === b.expiryYear && order.includes(a.expiryYear)) {
                      return (a.expiryYear as any) - (b.expiryYear as any);
                    } else if (a.expiryYear < b.expiryYear && !order.includes(a.expiryYear)) {
                      return parseInt(a.expiryYear) - parseInt(b.expiryYear);
                    } else {
                      // when item not in order, indexOf will return -1.
                      // Basically comparing the values -1, 0, 1
                      return order.indexOf(b.expiryYear) - order.indexOf(a.expiryYear);
                    }
                  })
                  .map((summary, index) => {
                    return (
                      <React.Fragment key={index}>
                        <SummaryCard
                          title={`${numberFormat(Number(summary?.leaseArea.toString()))} SQM`}
                          type={summary.expiryYear}
                        />
                      </React.Fragment>
                    );
                  })}
            </div>
          </section>
        )}
      </div>

      <Suspense>
        <FilterDialog />
      </Suspense>
      <Suspense>
        <CreateFloorForm />
      </Suspense>
      <Suspense>
        <ImportStackingPlan />
      </Suspense>
    </>
  );
};

export default Controls;
