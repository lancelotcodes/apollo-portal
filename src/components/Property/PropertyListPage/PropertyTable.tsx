import { PropertyDetails, PropertyList } from '@/infrastructure/store/api/property/property-type';
import { setPaginationIndex } from '@/infrastructure/store/features/property-list/property-list-slice';
import { useAppDispatch } from '@/infrastructure/store/store-hooks';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../core/Button';
import { ViewIcon, WebsiteIcon, XlsIcon } from '../../core/Icon';
import IconButton from '../../core/IconButton';
import Pagination from '../../core/Pagination';
import Table from '../../core/Table';
import Tag from '../../core/Tag';
import React, { useMemo } from 'react';
import { gradeIDToGradeName } from '@/components/core/Tag/types-tag';
import TableCell from '@/components/core/Table/TableCell';

const PropertyTable: React.FC<PropertyList> = ({
  items,
  hasNextPage,
  hasPreviousPage,
  totalCount,
  totalPages,
  pageIndex,
}) => {
  const columnHelper = createColumnHelper<PropertyDetails>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'id',
        header: 'Action',
        cell: (info) => (
          <TableCell className="justify-center gap-1">
            <IconButton
              className="text-gray-blue-6"
              onClick={() => {
                navigate({
                  pathname: `/property/${info.getValue()}`,
                });
              }}
            >
              <ViewIcon />
            </IconButton>
            <IconButton className="text-gray-blue-6">
              <WebsiteIcon />
            </IconButton>
          </TableCell>
        ),
        size: 80,
      }),
      columnHelper.accessor('id', {
        header: 'Property ID',
        cell: (info) => <TableCell>{info.getValue() || '---'}</TableCell>,
        size: 20,
      }),
      columnHelper.accessor('name', {
        header: 'Property Name',
        cell: ({ getValue, row }) => (
          <TableCell className="whitespace-nowrap">
            <Link to={'/property/' + row.original.id} className="text-blue-5">
              {getValue()}
            </Link>
          </TableCell>
        ),
        size: 250,
      }),
      columnHelper.accessor('cityName', {
        header: 'City',
        id: 'city',
        cell: (info) => (
          <TableCell className="whitespace-nowrap">
            {info.getValue() ? info.getValue().split(', ')[0] : '---'}
          </TableCell>
        ),
        footer: (info) => info.column.id,
        size: 150,
      }),
      columnHelper.accessor('subMarketName', {
        header: 'Submarket',
        id: 'subMarketName',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? 'N/A'}</TableCell>,
      }),
      columnHelper.accessor('line1', {
        header: 'Address',
        id: 'Address',
        cell: (info) => <TableCell className="whitespace-nowrap">{info.getValue() ?? '---'}</TableCell>,
      }),
      columnHelper.accessor('gradeName', {
        header: 'Grade',
        cell: (info) => {
          const value = info.renderValue();
          return (
            <TableCell className="justify-center">
              <Tag type={gradeIDToGradeName(value)} value={value || ''} />
            </TableCell>
          );
        },
      }),
    ],
    [columnHelper, navigate],
  );

  const useReactTableReturn = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Table useReactTableReturn={useReactTableReturn} />
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
          <Button icon={<XlsIcon />}>Export</Button>
        </div>
      </div>
    </>
  );
};

export default PropertyTable;
