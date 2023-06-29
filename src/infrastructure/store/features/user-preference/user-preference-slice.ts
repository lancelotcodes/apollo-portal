import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { StackingViewMode } from '../property-details/property-details.slice';
import { PropertyListViewMode } from '../property-list/property-list-type';

export type PropertyDetailsSequenceType =
  | 'PROPERTY DETAILS'
  | 'BUILDING DETAILS'
  | 'LOCATION DETAILS'
  | 'IMAGE DETAILS'
  | 'DOCUMENTS'
  | '360 VIDEO'
  | 'AUDIT DETAILS';

export interface UserPreference {
  propertyViewMode: PropertyListViewMode;
  stackingViewMode: StackingViewMode;
  brokerDetails: 'left' | 'right';
  propertyDetailsSequence: PropertyDetailsSequenceType[];
  cardsByDefault: 'collapsed' | 'expanded';
  mapByDefault: 'collapsed' | 'expanded';
}

interface UserPreferenceSlice {
  hasValueChanged: boolean;
  oldPreference: UserPreference;
  newPreference: UserPreference;
}

export const initialState: UserPreferenceSlice = {
  hasValueChanged: false,
  newPreference: {
    propertyViewMode: 'grid',
    stackingViewMode: 'stacking',
    brokerDetails: 'right',
    propertyDetailsSequence: [
      'PROPERTY DETAILS',
      'BUILDING DETAILS',
      'LOCATION DETAILS',
      'IMAGE DETAILS',
      'DOCUMENTS',
      '360 VIDEO',
      'AUDIT DETAILS',
    ],
    cardsByDefault: 'collapsed',
    mapByDefault: 'collapsed',
  },
  oldPreference: {
    propertyViewMode: 'grid',
    stackingViewMode: 'stacking',
    brokerDetails: 'right',
    propertyDetailsSequence: [
      'PROPERTY DETAILS',
      'BUILDING DETAILS',
      'LOCATION DETAILS',
      'IMAGE DETAILS',
      'DOCUMENTS',
      '360 VIDEO',
      'AUDIT DETAILS',
    ],
    cardsByDefault: 'collapsed',
    mapByDefault: 'collapsed',
  },
};

const userPreferenceSlice = createSlice({
  name: 'user-preference',
  initialState,
  reducers: {
    setNewPreferenceValue: (state, action: PayloadAction<UserPreference>) => {
      state.newPreference = action.payload;

      state.hasValueChanged = JSON.stringify(state.oldPreference) === JSON.stringify(action.payload) ? false : true;
    },
    saveChangeduserPreference: (state) => {
      state.oldPreference = state.newPreference;
      state.hasValueChanged = false;
    },
    cancelChangeduserPreference: (state) => {
      state.newPreference = state.oldPreference;
      state.hasValueChanged = false;
    },
  },
});

export const { setNewPreferenceValue, saveChangeduserPreference, cancelChangeduserPreference } =
  userPreferenceSlice.actions;
export default userPreferenceSlice.reducer;
