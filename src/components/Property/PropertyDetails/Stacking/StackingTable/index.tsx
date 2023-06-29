import Button from '@/components/core/Button';
import { EditIcon, SortIcon, ViewIcon, XlsIcon } from '@/components/core/Icon';
import IconButton from '@/components/core/IconButton';
import CustomSelect, { OptionDefaultFormat } from '@/components/core/NewSelect';
import Table from '@/components/core/Table';
import TableCell from '@/components/core/Table/TableCell';
import Tag from '@/components/core/Tag';
import { tagTypes } from '@/components/core/Tag/types-tag';
import {
  setStackingSelectedId,
  setStackingSelectedUnitsFlatRows,
  toggleEditUnitDrawer,
} from '@/infrastructure/store/features/property-details/property-details.slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { CellContext, createColumnHelper, getCoreRowModel, RowData, useReactTable } from '@tanstack/react-table';
import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import TableControl from './TableControl';
import TableSingleValue from './TableSingleValue';
import TableOption from './TableOption';
import TableMenuList from './TableMenuList';
import { UnitsByBuildingId, UnitsByBuildingIdDetails } from '@/infrastructure/store/api/stacking/stacking-types';
import Pagination from '@/components/core/Pagination';
import { setPaginationIndex } from '@/infrastructure/store/features/property-list/property-list-slice';
import { classNames } from '@/helpers/classNames';
import { EndPoint } from '@/infrastructure/store/api/axios/end-points';
import { ExportFile } from '@/infrastructure/store/api/axios/file-api';
import Loader from '@/components/core/Loader';
import { useUnitAvailabilityQuery, useUnitHandOverConditionQuery, useUnitListingTypeQuery, useUnitStatusQuery } from '@/infrastructure/store/api/lookup/lookup-api';
import { SingleValue } from 'react-select';
import { setSelectedUnitTableData } from '@/infrastructure/store/features/unit-list/unit-list-slice';

const EditUnitDrawer = lazy(() => import('../Drawers/EditUnitDrawer'));

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

const StackingTable: React.FC<UnitsByBuildingIdDetails> = ({
  hasNextPage,
  hasPreviousPage,
  totalCount,
  totalPages,
  pageIndex,
}) => {
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper<UnitsByBuildingId>();
  const navigate = useNavigate();
  const selectedUnitId = useAppSelector((app) => app['property-details'].stacking.selectedUnitId);
  const selectedProperty = useAppSelector((app) => app['property-list'].selectedProperty);
  const { selectedBuildingUnitsDetails } = useAppSelector((state) => state['unit-list']);
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(selectedUnitId);
  const [data, setData] = useState<UnitsByBuildingId[]>(selectedBuildingUnitsDetails.map(item => { return { ...item, isUpdated: false } }))

  const { data: unitStatus } = useUnitStatusQuery(null);
  const { data: unitListingType } = useUnitListingTypeQuery(null);
  const { data: unitAvailability } = useUnitAvailabilityQuery(null);
  const { data: unitHandOverCondition } = useUnitHandOverConditionQuery(null);
  useEffect(() => {
    setData(selectedBuildingUnitsDetails)
  }, [selectedBuildingUnitsDetails])
  useEffect(() => {
    dispatch(setStackingSelectedId({ selectedUnitId: selected }));
  }, [selected, dispatch]);

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

            <IconButton
              className="text-gray-blue-6"
              onClick={() => {
                {
                  navigate({
                    pathname: `/property/${selectedProperty?.propertyID}/unit/${row.original.id}`,
                  });
                }
              }}
            >
              <ViewIcon />
            </IconButton>
          </TableCell>
        ),
      }),

      columnHelper.accessor('unitNumber', {
        header: () => 'Unit No.',
        cell: (e) => <TableCellEditableInput {...e} className="justify-center" />,
      }),
      columnHelper.accessor('floorName', {
        header: () => 'Floor Name',
        cell: (e) => <TableCellEditableInput {...e} className="justify-center" />,
      }),
      columnHelper.accessor('unitStatusName', {
        header: 'Status',
        cell: (e) => <TableCellEditableSelect {...e} idKey={"unitStatusID"} optionList={unitStatus?.data} className="justify-center" />,
      }),
      columnHelper.accessor('leaseFloorArea', {
        header: 'Lease Floor Area (SQM)',
        cell: (info) => <TableCellEditableInput {...info} />,
      }),
      columnHelper.accessor('listingTypeName', {
        header: 'Listing Type',
        cell: (info) => <TableCellEditableSelect className="justify-center" idKey={"listingTypeID"} optionList={unitListingType?.data} {...info} cellValue={info.row.original.listingTypeName} />,
      }),
      columnHelper.accessor('availabilityName', {
        header: 'Availability',
        cell: (info) => <TableCellEditableSelect {...info} className="justify-center" idKey={"availabilityID"} optionList={unitAvailability?.data} />,
      }),
      columnHelper.accessor('handOverConditionName', {
        header: 'Hand Over Condition',
        cell: (info) => <TableCellEditableSelect {...info} className="justify-center" idKey={"handOverConditionID"} optionList={unitHandOverCondition?.data} />,
      }),
      columnHelper.accessor('basePrice', {
        header: 'Base Price (PHP)',
        cell: (info) => {
          const value = info.renderValue();
          return <TableCellEditableInput {...info} cellValue={value ?? ''} />;
        },
      }),
      columnHelper.accessor('escalationRate', {
        header: 'Escalation Rate (%)',
        cell: (info) => <TableCellEditableInput {...info} />,
      }),
      columnHelper.accessor('cusa', {
        header: 'CUSA (PHP)',
        cell: (info) => <TableCellEditableInput {...info} />,
      }),
      columnHelper.accessor('acCharges', {
        header: 'AC Charges',
        cell: (info) => <TableCellEditableInput {...info} />,
      }),
      columnHelper.accessor('acExtensionCharges', {
        header: 'AC Extension',
        cell: (info) => <TableCellEditableInput {...info} />,
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [columnHelper, navigate, selectedProperty?.propertyID],
  );

  const useReactTableReturn = useReactTable({
    data: data !== undefined ? data : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selected,
    },
    onRowSelectionChange: setSelected,
    onStateChange: () => { dispatch(setSelectedUnitTableData(data)) },
    enableRowSelection: true,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
                isUpdated: true,
              }
            }
            return row
          })
        )
      },
    },
  });
  useEffect(() => {
    dispatch(
      setStackingSelectedUnitsFlatRows({
        selectedUnitsFlatRows: useReactTableReturn.getSelectedRowModel().flatRows.map((row) => row.original),
      }),
    );
  }, [selected, useReactTableReturn, dispatch]);

  return (
    <>
      {Object.keys(selectedUnitId).length > 0 && (
        <div className="p-4 flex gap-4 h-[82px] items-center">
          <Button
            btnType="tertiary-gray"
            disabled={Object.keys(selectedUnitId).length < 2}
            icon={<EditIcon />}
            onClick={() => dispatch(toggleEditUnitDrawer(true))}
          >
            Edit {Object.keys(selectedUnitId).length} units
          </Button>

          <IconButton>
            <SortIcon />
          </IconButton>
        </div>
      )}

      <section className="px-4">
        <Table useReactTableReturn={useReactTableReturn} tableHeighClassName="max-h-[calc(100vh-420px)]" />
        <div className="flex items-center justify-between">
          <Pagination
            pageSize={14}
            onPageChange={(e) => dispatch(setPaginationIndex(e))}
            {...{
              hasNextPage,
              hasPreviousPage,
              totalCount,
              totalPages,
              pageIndex,
            }}
          />

          <div className="">
            <Button
              onClick={async () => {
                setLoading(true);
                await ExportFile(`${EndPoint.EXPORTSTACKINGPLAN}${selectedProperty?.id}`);
                setLoading(false);
              }}
              icon={<XlsIcon />}
            >
              Export
            </Button>
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-30 opacity-100 flex items-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </section>
      <Suspense>
        <EditUnitDrawer />
      </Suspense>
    </>
  );
};

export const TableCellEditableSelect = <T extends string | number>(
  props: CellContext<UnitsByBuildingId, T> & {
    className?: string;
    cellValue?: string | number | JSX.Element;
    idKey?: string;
    optionList?: {
      id: number;
      name: string;
    }[];
  },
) => {
  const { className, optionList, idKey, ...rest } = props;
  const { getValue, row: { index }, column: { id }, table } = rest;


  const initialValue: string = getValue().toString() as string;
  const [isEditing, setIsEditing] = useState(false);
  const [statusValue, setStatusValue] = useState({ name: initialValue, value: initialValue });
  return (
    <TableCell className={classNames('w-full p-0 ', className)}>
      {isEditing ? (
        <CustomSelect
          onChange={(e: SingleValue<OptionDefaultFormat> | any) => {
            console.log(e);
            setStatusValue(
              e as {
                name: string;
                value: string;
              },
            );
            table.options.meta?.updateData(index, id, e.name)
            idKey && table.options.meta?.updateData(index, idKey, e.value)
          }}
          onMenuClose={() => setIsEditing(false)}
          isMulti={false}
          defaultValue={statusValue}
          options={optionList?.map((option) => ({
            value: option.id,
            name: option.name,
          }))}
          name="status"
          selected={statusValue.value}
          components={{
            SingleValue: TableSingleValue,
            Control: TableControl,
            Option: TableOption,
            MenuList: TableMenuList,
            DropdownIndicator: () => null,
            ClearIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      ) : (
        <Tag
          onClick={() => setIsEditing(true)}
          className="inline col-start-1 row-start-1 w-40"
          title={statusValue.name}
          value={statusValue.name.length < 25 ? statusValue.name : statusValue.name.substring(0, 22) + "..."}
          type={`${statusValue.value}` as tagTypes}
        />
      )}
    </TableCell>
  );
};

const TableCellEditableInput = <T extends string | number>(
  props: CellContext<UnitsByBuildingId, T> & {
    className?: string;
    cellValue?: string | number | JSX.Element;
  },
) => {
  const { className, ...rest } = props;
  const { getValue, row: { index }, column: { id }, table } = rest;

  const initialValue: string = getValue() as string;
  const [value, setValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onBlur = () => {
    setIsEditing(false)
    table.options.meta?.updateData(index, id, value)
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
    setValue(initialValue)
  }, [initialValue, isEditing]);

  return (
    <TableCell className={className}>
      {isEditing ? (
        <input
          className="w-full"
          ref={inputRef}
          defaultValue={value}
          onBlur={onBlur}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      ) : (
        <span onDoubleClick={() => setIsEditing(true)}>{value ?? initialValue ?? 'N/A'}</span>
      )}
    </TableCell>
  );
};

export default StackingTable;
