import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UnitTabType = 'Unit Details' | 'Tenant Details';

export interface PropertyDetailsState {
  tab: UnitTabType;
}

export const initialState: PropertyDetailsState = {
  tab: 'Unit Details',
};

const unitDetailsSlice = createSlice({
  name: 'unit-details',
  initialState,
  reducers: {
    setUnitTabChanged: (state, action: PayloadAction<UnitTabType>) => {
      console.log(action.payload);
      state.tab = action.payload;
    },
  },
});

export const { setUnitTabChanged } = unitDetailsSlice.actions;
export default unitDetailsSlice.reducer;
