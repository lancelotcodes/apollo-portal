import { DragAndDrop } from '@/components/core/Icon';
import Radio from '@/components/core/Radio';
import {
  PropertyDetailsSequenceType,
  UserPreference,
} from '@/infrastructure/store/features/user-preference/user-preference-slice';
import { useAppSelector } from '@/infrastructure/store/store-hooks';
import React from 'react';
import { List, arrayMove } from 'react-movable';

interface Props {
  handlePreferenceChange: (value: Partial<UserPreference>) => void;
}

const CustomizationPropertyDetails: React.FC<Props> = ({ handlePreferenceChange }) => {
  const newPreference = useAppSelector((app) => app['user-preference'].newPreference);

  return (
    <section className="bg-white border border-gray-blue-2 p-4 rounded-lg space-y-4">
      <div className="flex gap-2 items-end h-6">
        <h4 className="font-bold text-gray-blue-7">Work Details</h4>
      </div>
      <Radio
        value={newPreference.brokerDetails}
        onChange={(e) => {
          handlePreferenceChange({
            brokerDetails: e.target.id as 'left' | 'right',
          });
        }}
        label="What do you want to see by default?"
        name="brokerDetails"
        options={[
          {
            name: 'Right side',
            value: 'right',
          },
          {
            name: 'Left side',
            value: 'left',
          },
        ]}
      />

      <div className="mt-5 space-y-2 relative">
        <p className="typography-label font-medium text-gray-blue-7">Property info sequence</p>
        <List
          lockVertically
          values={newPreference.propertyDetailsSequence}
          onChange={({ oldIndex, newIndex }) =>
            handlePreferenceChange({
              propertyDetailsSequence: arrayMove(
                newPreference.propertyDetailsSequence,
                oldIndex,
                newIndex,
              ) as PropertyDetailsSequenceType[],
            })
          }
          renderList={({ children, props }) => (
            <ul className="space-y-2" {...props}>
              {children}
            </ul>
          )}
          renderItem={({ value, props }) => (
            <li
              className="group cursor-pointer border w-full max-w-sm rounded p-2 border-gray-blue-2 bg-white flex items-end gap-1"
              {...props}
            >
              <span className="group-hover:text-gray-blue-9 text-gray-blue-6">
                <DragAndDrop />
              </span>
              <p className="typography-button font-bold">{value}</p>
            </li>
          )}
        />
      </div>

      <Radio
        value={newPreference.brokerDetails}
        onChange={(e) => {
          handlePreferenceChange({
            brokerDetails: e.target.id as 'left' | 'right',
          });
        }}
        label="Cards by default"
        name="cardsByDefault"
        options={[
          {
            name: 'Right side',
            value: 'right',
          },
          {
            name: 'Left side',
            value: 'left',
          },
        ]}
      />

      <Radio
        value={newPreference.brokerDetails}
        onChange={(e) => {
          handlePreferenceChange({
            brokerDetails: e.target.id as 'left' | 'right',
          });
        }}
        label="Map by default"
        name="mapByDefault"
        options={[
          {
            name: 'Right side',
            value: 'right',
          },
          {
            name: 'Left side',
            value: 'left',
          },
        ]}
      />
    </section>
  );
};

export default CustomizationPropertyDetails;
