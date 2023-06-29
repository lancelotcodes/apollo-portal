import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { StackingListState } from './unit-list-type';
import { BuildingUnitById, FloorsByBuildingId, UnitsByBuildingId } from '../../api/stacking/stacking-types';

const initialState: StackingListState = {
  selectedUnitDetails: null,
  selectedBuildingFloorDetails: [],
  selectedBuildingUnitsDetails: [],
  selectedUnitTableData: [],
  selectedUnitDetailsLoading: false,
};

const unitListSlice = createSlice({
  name: 'unit-list',
  initialState,
  reducers: {
    setSelectedUnitDetails: (state, action: PayloadAction<BuildingUnitById | null>) => {
      if (action.payload === null) {
        state.selectedUnitDetails = action.payload;
        return;
      }

      state.selectedUnitDetails = { ...state.selectedUnitDetails, ...action.payload };
    },
    setSelectedUnitDetailsLoading: (state, action: PayloadAction<boolean | null>) => {
      if (action.payload === true) {
        state.selectedUnitDetailsLoading = action.payload;
        return;
      }
      state.selectedUnitDetailsLoading = false;
    },
    setSelectedBuildingFloorDetails: (state, action: PayloadAction<FloorsByBuildingId[]>) => {
      if (action.payload.length === 0) {
        state.selectedBuildingFloorDetails = action.payload;
        return;
      }

      state.selectedBuildingFloorDetails = action.payload;
    },
    setSelectedBuildingUnitsDetails: (state, action: PayloadAction<UnitsByBuildingId[]>) => {
      if (action.payload.length === 0) {
        state.selectedBuildingUnitsDetails = action.payload;
        return;
      }

      state.selectedBuildingUnitsDetails = action.payload;
    },
    setSelectedUnitTableData: (state, action: PayloadAction<UnitsByBuildingId[]>) => {
      if (action.payload.length === 0) {
        state.selectedUnitTableData = action.payload;
        return;
      }

      state.selectedUnitTableData = action.payload;
    },
  },
});

export const {
  setSelectedUnitDetails,
  setSelectedUnitDetailsLoading,
  setSelectedBuildingFloorDetails,
  setSelectedBuildingUnitsDetails,
  setSelectedUnitTableData,
} = unitListSlice.actions;
export default unitListSlice.reducer;
