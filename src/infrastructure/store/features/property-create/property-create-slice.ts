import { FCC } from '@/helpers/FCC';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { StepHelpers } from '@/hooks/useStep';
import PropertyDetailsFormContainer from '@/components/Property/CreatePropertyPage/PropertyForms/PropertyDetailsForm/Index';
import BrokerAndAuditFormContainer from '@/components/Property/CreatePropertyPage/PropertyForms/BrokerAndAuditDetailsForm';
import BuildingDetailsFormContainer from '@/components/Property/CreatePropertyPage/PropertyForms/BuildingsDetailsForm';
import LocationDetailsFormContainer from '@/components/Property/CreatePropertyPage/PropertyForms/LocationDetailsForm';
import ReviewForm from '@/components/Property/CreatePropertyPage/PropertyForms/ReviewForm';
import { BuildingsTypes } from '@/helpers/building';
import MediaFormContainer from '@/components/Property/CreatePropertyPage/PropertyForms/MediaDetailsForm';

export type CreatePropertyStep = {
  id: number;
  name: string;
  component: FCC<StepHelpers>;
};
interface PropertyCreateSlice {
  steps: CreatePropertyStep[];
  hasBuidling: CreatePropertyStep;
}

const initialState: PropertyCreateSlice = {
  steps: [
    { id: 1, name: 'Property Details', component: PropertyDetailsFormContainer },
    { id: 2, name: 'Location', component: LocationDetailsFormContainer },
    { id: 4, name: 'Media', component: MediaFormContainer },
    { id: 5, name: 'Agent', component: BrokerAndAuditFormContainer },
    { id: 6, name: 'Review', component: ReviewForm },
  ],
  hasBuidling: { id: 3, name: 'Buildings', component: BuildingDetailsFormContainer },
};

const propertyCreateSlice = createSlice({
  name: 'property-create',
  initialState,
  reducers: {
    propertyStepsChanged: (state, action: PayloadAction<string | undefined>) => {
      if (
        action?.payload &&
        !BuildingsTypes.includes(action?.payload) &&
        state.steps.map((x) => x.name).indexOf('Buildings') > -1
      ) {
        state.steps.splice(state.steps.map((x) => x.name).indexOf('Buildings'), 1);
      } else if (
        action?.payload &&
        BuildingsTypes.includes(action?.payload) &&
        state.steps.map((x) => x.name).indexOf('Buildings') == -1
      ) {
        state.steps.splice(state.steps.map((x) => x.name).indexOf('Location') + 1, 0, state.hasBuidling);
      }
    },
  },
});

export const { propertyStepsChanged } = propertyCreateSlice.actions;
export default propertyCreateSlice.reducer;
