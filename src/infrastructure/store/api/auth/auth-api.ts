import { appApi } from './../index';
import { LoginPayload, LoginResponse } from './auth-types';
import { GenericResponseType } from '../types/generic/http-types';

const authApi = appApi
  .injectEndpoints({
    endpoints: (build) => ({
      // LOGIN
      login: build.mutation<GenericResponseType<LoginResponse>, LoginPayload>({
        query: (payload) => ({
          url: '/auth/login',
          body: payload,
          method: 'POST',
        }),
        extraOptions: {},
      }),
      // REFRESH TOKEN
      refreshToken: build.mutation<GenericResponseType<LoginResponse>, null>({
        query: () => ({
          url: '/auth/refresh-token',
          method: 'POST',
        }),
      }),
      // LOGOUT
      logout: build.mutation<GenericResponseType<boolean>, null>({
        query: () => ({
          url: '/auth/log-out',
          method: 'POST',
        }),
      }),
    }),
  })
  .enhanceEndpoints({
    addTagTypes: ['Auth'],
  });

export const { useLoginMutation, useLogoutMutation, useRefreshTokenMutation } = authApi;
