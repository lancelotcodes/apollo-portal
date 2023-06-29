import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PersonalProfileTabType =
  | "Personal Details"
  | "Work Details"
  | "Customization";

interface PersonalProfileSlice {
  personalProfileTab: PersonalProfileTabType;
  isEditingProfileDetails: boolean;
  isEditingWorkDetails: boolean;
}

const initialState: PersonalProfileSlice = {
  personalProfileTab: "Personal Details",
  isEditingProfileDetails: false,
  isEditingWorkDetails: false
};

const personalProfileSlice = createSlice({
  name: "personal-profile",
  initialState,
  reducers: {
    setProfileTab: (state, action: PayloadAction<PersonalProfileTabType>) => {
      state.personalProfileTab = action.payload;
    },
    toggleEditProfileDetails: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isEditingProfileDetails =
        action?.payload ?? state.isEditingProfileDetails;
    },
    toggleEditWorkDetails: (
      state,
      action: PayloadAction<boolean | undefined>
    ) => {
      state.isEditingWorkDetails =
        action?.payload ?? state.isEditingWorkDetails;
    }
  }
});

export const {
  setProfileTab,
  toggleEditProfileDetails,
  toggleEditWorkDetails
} = personalProfileSlice.actions;
export default personalProfileSlice.reducer;
