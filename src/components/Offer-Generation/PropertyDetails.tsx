import { classNames } from '@/helpers/classNames';
import { OfferOptionResponse, Unit } from '@/infrastructure/store/api/offer/offer-type';
import { PropertyAddress, PropertyDetails } from '@/infrastructure/store/api/property/property-type';
import { UnitsByBuildingId } from '@/infrastructure/store/api/stacking/stacking-types';
import {
  setOfferGenerationSelectedIds,
  setOfferGenerationSelectedUnitIds,
} from '@/infrastructure/store/features/offer-generation/offer-generation-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { createColumnHelper, getCoreRowModel, RowSelectionState, Updater, useReactTable } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { IMAGES } from 'src/assets/images';
import Accordion from '../core/Accordion';
import Table from '../core/Table';
import TableCell from '../core/Table/TableCell';
import IndeterminateCheckbox from '../Property/PropertyDetails/Stacking/StackingTable/IndeterminateCheckbox';

interface PropertyDetailsProps {
  address?: PropertyAddress;
  propertyDetials?: PropertyDetails;
  propertyUnits?: UnitsByBuildingId[];
  searchedPropertyList?: OfferOptionResponse;
}

const PropertyDetailsComponent: React.FC<PropertyDetailsProps> = ({ searchedPropertyList }) => {
  const selectedIds = useAppSelector((app) => app['offer-generation'].selectedIds);
  const [selected, setSelected] = useState(selectedIds);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOfferGenerationSelectedIds(selected));
  }, [selected, dispatch]);

  const columnHelper = createColumnHelper<Unit>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'id',
        size: 80,
        header: ({ table }) => (
          <span className="flex items-center gap-2">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />

            <span>Action</span>
          </span>
        ),
        cell: ({ row }) => (
          <TableCell className="justify-center gap-2">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </TableCell>
        ),
      }),
      columnHelper.accessor('unitNumber', {
        header: 'Unit Number',
        cell: ({ getValue }) => <TableCell className="whitespace-nowrap">{getValue()}</TableCell>,
        size: 250,
      }),
      columnHelper.accessor('unitStatusName', {
        header: 'Status',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue()}</TableCell>,
      }),
      columnHelper.accessor('leaseFloorArea', {
        header: 'Lease Floor Area (SQM)',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue()}</TableCell>,
      }),
      columnHelper.accessor('listingTypeName', {
        header: 'Listing Type',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('basePrice', {
        header: 'Base Price',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('cusa', {
        header: 'CUSA',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('handOverConditionName', {
        header: 'Hand Over Condition',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('acCharges', {
        header: 'AC Charges',
        id: 'brokerCompanyName',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
    ],
    [columnHelper],
  );

  // Function to save selected unitIds in the store
  const handleSelectedUnitIds = async (row: Updater<RowSelectionState>) => {
    await setSelected(row);
    const idss = useReactTableReturn.getSelectedRowModel();
    if (searchedPropertyList?.id) {
      dispatch(
        setOfferGenerationSelectedUnitIds({
          propertyId: searchedPropertyList?.id,
          AllUnitIds: idss.rows.map((row) => row.original.id),
        }),
      );
    }
  };

  const useReactTableReturn = useReactTable({
    data: searchedPropertyList?.units !== undefined ? searchedPropertyList?.units : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selected,
    },
    onRowSelectionChange: (row) => handleSelectedUnitIds(row),
    enableRowSelection: true,
  });

  return (
    <section className="border border-gray-blue-2 rounded-lg bg-white mx-4 px-4">
      <Accordion
        defaultOpen
        title="PROPERTY DETAILS"
        renderTitle={(E, open) => (
          <E className="flex p-4 justify-between w-full text-gray-blue-5 hover:text-gray-blue-9 items-center">
            {(searchedPropertyList && searchedPropertyList?.name?.toUpperCase()) || ''}
            <ChevronUpIcon className={classNames('h-5 w-5 transition-transform', !open && 'rotate-180 transform')} />
          </E>
        )}
      >
        <div className="px-4 pb-4 space-y-4">
          <p className="typography-button text-gray-blue-5"></p>

          <div className="flex gap-4">
            <div className="self-stretch w-[320px] bg-gray-blue-3 rounded">
              <img
                className="w-full h-full rounded"
                src={(searchedPropertyList && searchedPropertyList?.mainImage) || IMAGES.DUMMYPHOTO}
                alt="main-img"
              />
            </div>

            <ul className="flex-1">
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Name</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.name) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Listing Agent</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.agent?.agentName) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">City</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.address.cityName) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Sub Market</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.address?.subMarketName) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Micro District</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.address?.microDistrictName) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Listing Type</span>
                <span className="typography-body text-black flex-1">Details</span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Property Type</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.propertyTypeName) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Available Units</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.availableUnits) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                  Available Area For Rent (SQM)
                </span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.availableSpace) || ''}
                </span>
              </li>
            </ul>

            <ul className="flex-1">
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">24/7</span>
                <span className="typography-body text-black flex-1">
                  {searchedPropertyList && searchedPropertyList?.building?.operatingHours === true ? 'Yes' : 'No'}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Peza</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.building?.pezaName) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Density Ratio (%)</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.building?.densityRatio) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">Efficiency Ratio (%)</span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.building?.efficiencyRatio) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                  Minimum Lease Term (Month)
                </span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.building?.minimumLeaseTerm) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                  Gross Building Size (SQM)
                </span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.building?.grossBuildingSize) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                  Gross Leasable Size (SQM)
                </span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.building.grossLeasableSize) || ''}
                </span>
              </li>
              <li className="space-x-1 items-end w-full flex even:bg-blue-1 px-1 py-2">
                <span className="typography-caption flex-1 font-medium text-gray-blue-7">
                  Typical Floor Plate Size (SQM)
                </span>
                <span className="typography-body text-black flex-1">
                  {(searchedPropertyList && searchedPropertyList?.building.typicalFloorPlateSize) || ''}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="font-bold">Unit List</h3>
          <Table useReactTableReturn={useReactTableReturn} />
        </div>
      </Accordion>
    </section>
  );
};

export default PropertyDetailsComponent;
