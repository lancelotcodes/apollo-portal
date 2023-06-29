import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UnitsByBuildingId } from '../../api/stacking/stacking-types';

export type PropertyTabType = 'Property Details' | 'Stacking Plan' | 'Leads';
export type StackingState = {
  viewMode: StackingViewMode;
  filterDialogOpen: boolean;
  createFloorDialogOpen: boolean;
  importStackingPlanOpen: boolean;
  filterState: FilterState;
  sort: StackingSortBy;
  openSummary: boolean;
  selectedUnitId: Record<string, boolean>;
  selectedUnitsFlatRows: UnitsByBuildingId[];
  editUnitDrawerOpen: boolean;
};
export type StackingViewMode = 'stacking' | 'list';
export type StackingFilterStatus = 'Vacant' | 'Tenanted' | 'All';
export type StackingSortBy = 'asc' | 'desc';
export type FilterState = {
  status: StackingFilterStatus;
  leaseExpiration: Record<number, boolean>;
};

export interface PropertyDetailsState {
  tab: PropertyTabType;
  stacking: StackingState;
}

export const initialState: PropertyDetailsState = {
  tab: 'Property Details',
  stacking: {
    filterState: {
      leaseExpiration: {},
      status: 'All',
    },
    viewMode: 'stacking',
    sort: 'desc',
    openSummary: false,
    selectedUnitId: {},
    selectedUnitsFlatRows: [],
    editUnitDrawerOpen: false,
    filterDialogOpen: false,
    createFloorDialogOpen: false,
    importStackingPlanOpen: false,
  },
};

const propertyDetailsSlice = createSlice({
  name: 'property-details',
  initialState,
  reducers: {
    propertyTabChanged: (state, action: PayloadAction<Pick<PropertyDetailsState, 'tab'>>) => {
      state.tab = action.payload.tab;
    },
    setStackingState: (state, action: PayloadAction<Partial<StackingState>>) => {
      state.stacking = { ...state.stacking, ...action.payload };
    },
    toggleSummary: (state) => {
      state.stacking.openSummary = !state.stacking.openSummary;
    },
    setStackingSelectedId: (state, action: PayloadAction<{ selectedUnitId: Record<string, boolean> }>) => {
      state.stacking.selectedUnitId = action.payload.selectedUnitId;
    },
    setStackingSelectedUnitsFlatRows: (
      state,
      action: PayloadAction<{ selectedUnitsFlatRows: UnitsByBuildingId[] }>,
    ) => {
      state.stacking.selectedUnitsFlatRows = action.payload.selectedUnitsFlatRows;
    },
    toggleEditUnitDrawer: (state, action: PayloadAction<boolean | undefined>) => {
      state.stacking.editUnitDrawerOpen = action.payload ?? !state.stacking.editUnitDrawerOpen;
    },
    toggleFilterDialog: (state, action: PayloadAction<boolean | undefined>) => {
      state.stacking.filterDialogOpen = action.payload ?? !state.stacking.filterDialogOpen;
    },
    setFilterState: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.stacking.filterState = { ...state.stacking.filterState, ...action.payload };
    },
    toggleCreateFloorDialog: (state, action: PayloadAction<boolean | undefined>) => {
      state.stacking.createFloorDialogOpen = action.payload ?? !state.stacking.createFloorDialogOpen;
    },
    toggleImportStackingPlanDialog: (state, action: PayloadAction<boolean | undefined>) => {
      state.stacking.importStackingPlanOpen = action.payload ?? !state.stacking.importStackingPlanOpen;
    },
  },
});

export const {
  propertyTabChanged,
  setStackingState,
  toggleSummary,
  setStackingSelectedId,
  setStackingSelectedUnitsFlatRows,
  toggleEditUnitDrawer,
  toggleFilterDialog,
  setFilterState,
  toggleCreateFloorDialog,
  toggleImportStackingPlanDialog,
} = propertyDetailsSlice.actions;
export default propertyDetailsSlice.reducer;
