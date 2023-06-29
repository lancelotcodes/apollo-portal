/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { flexRender, Table as RTable } from '@tanstack/react-table';
import { classNames } from '@/helpers/classNames';

interface Props<T> {
  useReactTableReturn: RTable<T>;
  tableHeighClassName?: string;
}

const Table = <T extends Record<any, any>>(props: Props<T>) => {
  const { getHeaderGroups, getRowModel, getCenterTotalSize } = props.useReactTableReturn;
  return (
    <div>
      <div className="inline-block py-2 align-middle w-full">
        <div className={classNames('overflow-auto border rounded w-full', props.tableHeighClassName)}>
          <table
            className="divide-y divide-gray-300 w-full rounded border-gray-blue-3"
            style={{ minWidth: getCenterTotalSize() }}
          >
            {/* THEAD */}
            <thead className="rounded-xl bg-gray-1 text-left sticky top-0">
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="divide-x divide-gray-blue-3">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                        className="whitespace-nowrap typography-label font-medium py-2 px-4"
                      >
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            {/* TBODY */}
            <tbody className="divide-y divide-gray-blue-3 bg-white">
              {getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className="divide-x divide-gray-blue-3">
                    {row.getVisibleCells().map(({ id, getContext, column, row }) => (
                      <td
                        key={id}
                        className={classNames(
                          'typography-body p-0 transition-colors',
                          row.getIsSelected() ? 'bg-blue-2' : 'bg-white',
                        )}
                      >
                        {flexRender(column.columnDef.cell, getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
