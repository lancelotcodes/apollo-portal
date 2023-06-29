import React, { useState } from 'react';
import Button from '@/components/core/Button';
import Dialog from '@/components/core/Dialog';
import Radio from '@/components/core/Radio';
import Tag from '@/components/core/Tag';
import { classNames } from '@/helpers/classNames';
import {
  setFilterState,
  StackingFilterStatus,
  toggleFilterDialog,
} from '@/infrastructure/store/features/property-details/property-details.slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import { format } from 'date-fns';

const FilterDialog = () => {
  const { filterDialogOpen, filterState } = useAppSelector((app) => app['property-details'].stacking);
  const [filterStatus, setfilterStatus] = useState<StackingFilterStatus>(filterState.status);
  const [leaseExpiryYears, setLeaseExpiryYears] = useState(filterState.leaseExpiration);

  const dispatch = useAppDispatch();

  const handleCloseDialog = () => {
    dispatch(toggleFilterDialog(false));
  };

  // Select lease expiry year to filter floor data
  const handleLeaseExpiryChanged = (year: number) => {
    setLeaseExpiryYears((old) => {
      const isSelected = old?.[year];

      return { ...old, [year]: !isSelected };
    });
  };

  // Apply filter
  const handleApply = () => {
    dispatch(setFilterState({ status: filterStatus, leaseExpiration: leaseExpiryYears }));
    handleCloseDialog();
  };

  // Reset filter
  const handleClear = () => {
    setfilterStatus('All');
    setLeaseExpiryYears({});
    dispatch(setFilterState({ status: 'All', leaseExpiration: {} }));
  };

  return (
    <Dialog size="xl" title="Filter" modalState={filterDialogOpen} closeDialog={handleCloseDialog}>
      <div className="space-y-4">
        <Radio
          onChange={(e) => setfilterStatus(e.currentTarget.id as StackingFilterStatus)}
          value={filterStatus}
          options={[
            { name: 'All', value: 'All' },
            { name: 'Vacant', value: 'Vacant' },
            { name: 'Tenanted', value: 'Tenanted' },
          ]}
        />
        <div className="flex gap-2 flex-wrap">
          <span className="block font-medium typography-label text-gray-7 mb-1 w-full">Lease Expiration</span>
          {Array(8)
            .fill({})
            .map((_, idx) => {
              const year = +format(new Date(), 'yyyy') + idx;
              return (
                <Tag
                  onClick={() => handleLeaseExpiryChanged(year)}
                  className={classNames(
                    'hover:bg-blue-5 hover:text-white cursor-pointer',
                    leaseExpiryYears?.[year] && 'bg-blue-5 text-white',
                  )}
                  type="lease"
                  key={idx}
                  value={year}
                />
              );
            })}
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <Button btnType="secondary-gray" onClick={handleClear}>
          CLEAR
        </Button>
        <Button onClick={handleApply}>APPLY</Button>
      </div>
    </Dialog>
  );
};

export default FilterDialog;
