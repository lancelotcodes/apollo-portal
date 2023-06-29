import Button from '@/components/core/Button';
import { XlsIcon } from '@/components/core/Icon';
import Table from '@/components/core/Table';
import TableCell from '@/components/core/Table/TableCell';
import IndeterminateCheckbox from '@/components/Property/PropertyDetails/Stacking/StackingTable/IndeterminateCheckbox';
import { classNames } from '@/helpers/classNames';
import { useBuildingByIDQuery } from '@/infrastructure/store/api/property/property-api';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const tabs: { name: string; value: 'tenants' | 'leads' }[] = [
  { name: 'Tenants', value: 'tenants' },
  { name: 'Leads', value: 'leads' },
];

interface Tenants {
  name: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  classification: number;
}
const tenants: Tenants[] = [
  {
    name: 'Apple',
    propertyName: 'Sun Life Center',
    startDate: '01-01-2020',
    endDate: '01-01-2024',
    classification: 1,
  },
  {
    name: 'Samsung',
    propertyName: 'Picadilly Star',
    startDate: '01-01-2020',
    endDate: '01-01-2024',
    classification: 1,
  },
  {
    name: 'Nokia',
    propertyName: 'Cyber Sigma',
    startDate: '01-01-2020',
    endDate: '01-01-2024',
    classification: 1,
  },
];
interface Leads {
  contactPerson: string;
  companyName: string;
  phoneNumber: string;
  email: string;
  preferredBuilding: string;
}
const leads: Leads[] = [
  {
    contactPerson: 'Virginia Soriano',
    companyName: 'Apple',
    phoneNumber: '0932 238 8847',
    email: 'sample@email.com',
    preferredBuilding: 'Picadilly Building',
  },
  {
    contactPerson: 'Virgilio Soriano',
    companyName: 'Nokia',
    phoneNumber: '0998 328 1234',
    email: 'sample@email.com',
    preferredBuilding: 'Picadilly Building',
  },
  {
    contactPerson: 'Virge Soriano',
    companyName: 'Samsung',
    phoneNumber: '0985 435 4455',
    email: 'sample@email.com',
    preferredBuilding: 'Picadilly Building',
  },
];

const TenantAndLead = () => {
  const [selectedTab, setSelectedTab] = useState<'tenants' | 'leads'>('tenants');

  const propertyId = useAppSelector((app) => app['property-search'].search?.propertyId);

  const { data: property } = useBuildingByIDQuery(propertyId, {
    skip: typeof propertyId !== 'number',
  });

  if (!property) {
    return null;
  }

  return (
    <>
      <section className="px-2 sm:px-4 border-b border-gray-blue-2">
        <nav className="-mb-px flex gap-1 sm:gap-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              onClick={() => setSelectedTab(tab.value)}
              key={tab.value}
              className={classNames(
                'py-2 relative px-2 sm:px-3 rounded-t-lg border-t border-l border-r duration-75 transition-all',
                selectedTab === tab.value ? 'bg-gray-blue-1 border-gray-blue-2' : 'bg-none border-transparent',
              )}
              aria-current={selectedTab === tab.value ? 'page' : undefined}
            >
              <span
                className={classNames(
                  'typography-body font-normal duration-75 transition-color',
                  selectedTab === tab.value ? 'text-black' : 'text-gray-7',
                )}
              >
                <>{tab.name}</>

                <span
                  className={classNames(
                    'absolute w-8/12 h-0.5 rounded-full bottom-0 left-1/2 -translate-x-1/2 box-content duration-75 transition-color',
                    selectedTab === tab.value ? 'bg-blue-4' : 'bg-transparent',
                  )}
                />
              </span>
            </button>
          ))}
        </nav>
      </section>

      <div className="flex-1 flex flex-col">{selectedTab === 'tenants' ? <TenantsTable /> : <LeadsTable />}</div>
    </>
  );
};

const TenantsTable = () => {
  const [selectedTenants, setSelectedTenants] = useState({});

  const leadsColumnHelper = createColumnHelper<Tenants>();

  const leadColumns = useMemo(
    () => [
      leadsColumnHelper.display({
        id: 'select',
        size: 80,
        maxSize: 80,
        header: ({ table }) => (
          <span className="justify-center">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </span>
        ),
        cell: ({ row }) => (
          <TableCell className="justify-center">
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
      leadsColumnHelper.accessor('name', {
        header: 'Name',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
      }),
      leadsColumnHelper.accessor('propertyName', {
        header: 'Property Name',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
      }),
      leadsColumnHelper.accessor('startDate', {
        header: 'Start Date',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
      }),
      leadsColumnHelper.accessor('endDate', {
        header: 'End Date',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
      }),
      leadsColumnHelper.accessor('classification', {
        header: 'Classification',
        cell: ({ getValue }) => <TableCell className="justify-center">{getValue()}</TableCell>,
      }),
    ],
    [leadsColumnHelper],
  );

  const useReactTableReturn = useReactTable({
    data: tenants,
    columns: leadColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selectedTenants,
    },
    onRowSelectionChange: setSelectedTenants,
    enableRowSelection: true,
  });

  return (
    <>
      <div className="h-full">
        <Table useReactTableReturn={useReactTableReturn} />
      </div>

      {Object.keys(selectedTenants).length > 0 && (
        <div className="sticky p-4 border-t top-0 bg-white h-[72px] mt-0">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button btnType="secondary-gray" type="button" onClick={() => setSelectedTenants({})}>
                CLEAR
              </Button>
              <span className="typography-button font-bold text-gray-7">
                TENANTS SELECTED: {Object.keys(selectedTenants).length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button btnType="tertiary-gray" icon={<XlsIcon />} className="ml-auto">
                EXPORT
              </Button>
              <Button className="ml-auto">SEND EMAIL</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const LeadsTable = () => {
  const [selectedLeads, setSelectedLeads] = useState({});

  const leadsColumnHelper = createColumnHelper<Leads>();

  const leadColumns = useMemo(
    () => [
      leadsColumnHelper.display({
        id: 'select',
        size: 80,
        maxSize: 80,
        header: ({ table }) => (
          <span className="justify-center">
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          </span>
        ),
        cell: ({ row }) => (
          <TableCell className="justify-center">
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
      leadsColumnHelper.accessor('contactPerson', {
        header: 'Contact Person',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
        size: 200,
      }),
      leadsColumnHelper.accessor('companyName', {
        header: 'Company Name',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
        size: 200,
      }),
      leadsColumnHelper.accessor('phoneNumber', {
        header: 'Phone Number',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
      }),
      leadsColumnHelper.accessor('email', {
        header: 'Email',
        cell: ({ getValue }) => <TableCell>{getValue()}</TableCell>,
      }),
      leadsColumnHelper.accessor('preferredBuilding', {
        header: 'Preferred Building',
        cell: ({ getValue }) => <TableCell className="justify-center">{getValue()}</TableCell>,
        size: 80,
      }),
    ],
    [leadsColumnHelper],
  );

  const useReactTableReturn = useReactTable({
    data: leads,
    columns: leadColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection: selectedLeads,
    },
    onRowSelectionChange: setSelectedLeads,
    enableRowSelection: true,
  });

  return (
    <>
      <div className="h-full">
        <Table useReactTableReturn={useReactTableReturn} />
      </div>

      {Object.keys(selectedLeads).length > 0 && (
        <div className="sticky p-4 border-t top-0 bg-white h-[72px] mt-0">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Button btnType="secondary-gray" type="button" onClick={() => setSelectedLeads({})}>
                CLEAR
              </Button>
              <span className="typography-button font-bold text-gray-7">
                LEADS SELECTED: {Object.keys(selectedLeads).length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button btnType="tertiary-gray" icon={<XlsIcon />} className="ml-auto">
                EXPORT
              </Button>
              <Button className="ml-auto">SEND EMAIL</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TenantAndLead;
