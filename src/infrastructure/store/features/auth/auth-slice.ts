import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import { LoginResponse } from '../../api/auth/auth-types';

type AuthState = LoginResponse & {
  isAuthenticating: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  isAuthenticating: false,
  isAuthenticated: false,
  token: '',
  roles: [],
  user: {
    claims: [],
    email: '',
    firstName: '',
    id: '',
    isLocked: false,
    isVerified: false,
    lastName: '',
    phoneNumber: '',
    profilePicture: '',
    role: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<LoginResponse>) => {
      if (action.payload.token) {
        state.token = action.payload.token;
        state.roles = action.payload.roles;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      }
    },
    clearAuth: (state) => {
      state.token = initialState.token;
      state.roles = initialState.roles;
      state.user = initialState.user;
      state.isAuthenticated = false;
    },

    authenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
  },
});

export const { setAuth, clearAuth, authenticating } = authSlice.actions;
export default authSlice.reducer;
