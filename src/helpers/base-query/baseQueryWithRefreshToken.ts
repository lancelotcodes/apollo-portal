import { LoginResponse } from '@/infrastructure/store/api/auth/auth-types';
import { clearAuth, setAuth } from '@/infrastructure/store/features/auth/auth-slice';
import { RootState } from '@/infrastructure/store/store';
import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { Mutex } from 'async-mutex';

// Create a new mutex
const mutex = new Mutex();

const baseUrl = import.meta.env.VITE_PORTAL_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  credentials: 'include',
  baseUrl: baseUrl + '/api',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).auth.token;

    if (token && endpoint !== 'login') {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (typeof args !== 'string') {
    // wait until the mutex is available without locking it

    if (result.error?.status === 401 && args.url !== '/auth/refresh-token') {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();

        try {
          const refreshResult = await baseQuery(
            {
              credentials: 'include',
              url: '/auth/refresh-token',
              method: 'POST',
            },
            api,
            extraOptions,
          );

          if (refreshResult?.data) {
            api.dispatch(setAuth({ ...(refreshResult.data as LoginResponse) }));

            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(clearAuth());
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    if (result.error?.status === 401 && args.url === '/auth/refresh-token') {
      api.dispatch(clearAuth());
    }
  }

  return result;
};

export default baseQueryWithRefreshToken;
