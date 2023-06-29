import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import TableCell from '@/components/core/Table/TableCell';
import IconButton from '@/components/core/IconButton';
import { EditIcon } from '@/components/core/Icon';
import Table from '@/components/core/Table';
import { PropertyContractsById } from '@/infrastructure/store/api/stacking/stacking-types';
import { convertToLocalFormat } from '@/helpers/date-format';
import { numberFormat } from '@/helpers/numberFormat';

interface Props {
  TenantTableData?: PropertyContractsById[];
  handleUpdateContract: (row: PropertyContractsById) => void;
  setAddContract?: React.Dispatch<React.SetStateAction<boolean>>;
}
const TenantTable: React.FC<Props> = ({ TenantTableData, handleUpdateContract }) => {
  const columnHelper = createColumnHelper<PropertyContractsById>();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'id',
        header: 'Action',
        cell: (info) => (
          <TableCell className="justify-center gap-1">
            <IconButton
              type="button"
              className="text-gray-blue-6"
              onClick={() => handleUpdateContract(info.row.original)}
            >
              <EditIcon />
            </IconButton>
          </TableCell>
        ),
        size: 80,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ getValue }) => <TableCell className="whitespace-nowrap">{getValue()}</TableCell>,
        size: 250,
      }),
      columnHelper.accessor('startDate', {
        header: 'Commencement Date',
        id: 'startDate',
        cell: (info) => (
          <TableCell className="whitespace-nowrap">{convertToLocalFormat(info.getValue()) ?? 'N/A'}</TableCell>
        ),
      }),
      columnHelper.accessor('endDate', {
        header: 'Expiry Date',
        id: 'endDate',
        cell: (info) => (
          <TableCell className="whitespace-nowrap">{convertToLocalFormat(info.getValue()) ?? 'N/A'}</TableCell>
        ),
      }),
      columnHelper.accessor('estimatedArea', {
        header: 'Estimated Area (SQM)',
        id: 'estimatedArea',
        cell: (info) => <TableCell className="whitespace-nowrap">{numberFormat(info.getValue()) ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('closingRate', {
        header: 'Closing Rate (PHP)',
        id: 'closingRate',
        cell: (info) => <TableCell className="whitespace-nowrap">{numberFormat(info.getValue()) ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('leaseTerm', {
        header: 'Lease Term (Month)',
        id: 'leaseTerm',
        cell: (info) => <TableCell className="whitespace-nowrap">{numberFormat(info.getValue()) ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('tenantClassificationName', {
        header: 'Classification',
        id: 'tenantClassificationName',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('brokerCompanyName', {
        header: 'Agent Company',
        id: 'brokerCompanyName',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('isHistorical', {
        header: 'Is Historical?',
        id: 'isHistorical',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() === true ? 'Yes' : 'No'}</TableCell>,
      }),
    ],
    [columnHelper, handleUpdateContract],
  );

  const useReactTableReturn = useReactTable({
    data: TenantTableData !== undefined ? TenantTableData : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="pt-2">
      <h3 className="font-bold">Tenant List</h3>
      <Table useReactTableReturn={useReactTableReturn} />
    </div>
  );
};

export default TenantTable;
