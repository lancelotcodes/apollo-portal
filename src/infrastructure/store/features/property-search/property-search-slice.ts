import { PropertySearchFormType } from '@/form-resolvers/property-search/property-search-form-type';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { BuildingDetails } from '../../api/property/property-type';

interface PropertySearchSlice {
  selectedProperty: Partial<BuildingDetails> | null;
  search: Partial<PropertySearchFormType>;
}

const initialState: PropertySearchSlice = {
  selectedProperty: null,
  search: {
    radius: 5,
  },
};

const propertySearchSlice = createSlice({
  name: 'property-search',
  initialState,
  reducers: {
    setPropertySearchValue: (state, action: PayloadAction<Partial<PropertySearchFormType>>) => {
      state.search = { ...state.search, ...action.payload };
    },
  },
});

export const { setPropertySearchValue } = propertySearchSlice.actions;
export default propertySearchSlice.reducer;
