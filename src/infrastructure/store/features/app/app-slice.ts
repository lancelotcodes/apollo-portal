import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  navigation: string;
}

const initialState: AppState = {
  navigation: '/property',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /** App Navigation Actions **/
    // navChanged function is used for navigating the app
    navChanged: (state, action: PayloadAction<string>) => {
      state.navigation = action.payload;
    },
    clearNavChanged: (state) => {
      state.navigation = initialState.navigation;
    },
  },
});

export const { navChanged, clearNavChanged } = appSlice.actions;
export default appSlice.reducer;
