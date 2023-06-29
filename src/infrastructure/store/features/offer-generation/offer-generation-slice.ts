import { offerSearchFormType } from '@/form-resolvers/offer-generation/offerSearchForm';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PersonalProfileTabType = 'Personal Details' | 'Work Details' | 'Customization';

interface OfferGenerationSlice {
  search: Partial<offerSearchFormType>;
  selectedIds: Record<string, boolean>;
  selectedUnitIds: {
    propertyId: number | null;
    AllUnitIds: number[];
  }[];
  sendToClientDialogState: boolean;
}

const initialState: OfferGenerationSlice = {
  search: {},
  selectedIds: {},
  selectedUnitIds: [],
  sendToClientDialogState: false,
};

const offerGenerationSlice = createSlice({
  name: 'personal-profile',
  initialState,
  reducers: {
    setOfferGenerationSearchValue: (state, action: PayloadAction<Partial<offerSearchFormType>>) => {
      state.search = action.payload;
    },
    setOfferGenerationSelectedIds: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.selectedIds = action.payload;
    },
    setOfferGenerationSelectedUnitIds: (
      state,
      action: PayloadAction<{
        propertyId: number | null;
        AllUnitIds: number[];
      }>,
    ) => {
      if (action.payload.AllUnitIds.length === 0) {
        state.selectedUnitIds = [];
      } else if (
        state?.selectedUnitIds.length !== 0 &&
        action.payload.propertyId ===
          state?.selectedUnitIds?.find((x) => x.propertyId === action?.payload?.propertyId)?.propertyId
      ) {
        for (let i = 0; i < state.selectedUnitIds.length; i++) {
          if (state.selectedUnitIds[i].propertyId === action.payload.propertyId) {
            state.selectedUnitIds[i] = action.payload;
          }
        }
      } else {
        state.selectedUnitIds.push(action.payload);
      }
    },
    setSendToClientDialogState: (state, action: PayloadAction<boolean>) => {
      state.sendToClientDialogState = action.payload;
    },
  },
});

export const {
  setOfferGenerationSearchValue,
  setOfferGenerationSelectedIds,
  setSendToClientDialogState,
  setOfferGenerationSelectedUnitIds,
} = offerGenerationSlice.actions;
export default offerGenerationSlice.reducer;
