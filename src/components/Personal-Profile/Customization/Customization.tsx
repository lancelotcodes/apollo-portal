import Radio from '@/components/core/Radio';
import { PropertyListViewMode } from '@/infrastructure/store/features/property-list/property-list-type';
import {
  cancelChangeduserPreference,
  saveChangeduserPreference,
  setNewPreferenceValue,
  UserPreference,
} from '@/infrastructure/store/features/user-preference/user-preference-slice';
import { useAppDispatch, useAppSelector } from '@/infrastructure/store/store-hooks';
import Button from '@/components/core/Button';
import { StackingViewMode } from '@/infrastructure/store/features/property-details/property-details.slice';
import CustomizationPropertyDetails from './CustomizationPropertyDetails/CustomizationPropertyDetails';
import React from 'react';

const Customization = () => {
  const { hasValueChanged, newPreference } = useAppSelector((app) => app['user-preference']);

  const dispatch = useAppDispatch();

  const handlePreferenceChange = (value: Partial<UserPreference>) => {
    dispatch(setNewPreferenceValue({ ...newPreference, ...value }));
  };

  return (
    <div className="space-y-4 mb-[74px]">
      <section className="bg-white border border-gray-blue-2 p-4 rounded-lg space-y-4">
        <div className="flex gap-2 items-end h-6">
          <h4 className="font-bold text-gray-blue-7">Work Details</h4>
        </div>
        <Radio
          value={newPreference.propertyViewMode}
          onChange={(e) => {
            handlePreferenceChange({
              propertyViewMode: e.target.id as PropertyListViewMode,
            });
          }}
          label="What do you want to see by default?"
          name="propertyView"
          options={[
            {
              name: 'Grid',
              value: 'grid',
            },
            {
              name: 'List',
              value: 'list',
            },
            {
              name: 'Map',
              value: 'map',
            },
          ]}
        />
      </section>

      <section className="bg-white border border-gray-blue-2 p-4 rounded-lg space-y-4">
        <div className="flex gap-2 items-end h-6">
          <h4 className="font-bold text-gray-blue-7">Work Details</h4>
        </div>
        <Radio
          value={newPreference.stackingViewMode}
          onChange={(e) => {
            handlePreferenceChange({
              stackingViewMode: e.target.id as StackingViewMode,
            });
          }}
          label="What do you want to see by default?"
          name="stackingViewMode"
          options={[
            {
              name: 'Grid',
              value: 'stacking',
            },
            {
              name: 'Table View',
              value: 'list',
            },
          ]}
        />
      </section>

      <CustomizationPropertyDetails handlePreferenceChange={handlePreferenceChange} />

      {hasValueChanged && (
        <div className="absolute w-full md:w-[calc(100vw-104px)] bottom-0 right-0 p-4 bg-white border-t border-gray-200 z-10">
          <div className="flex justify-between">
            <Button btnType="secondary-gray" onClick={() => dispatch(cancelChangeduserPreference())}>
              CANCEL
            </Button>
            <Button onClick={() => dispatch(saveChangeduserPreference())}>SAVE</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customization;
