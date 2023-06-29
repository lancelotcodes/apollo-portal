import propertyCreateReducer from './features/property-create/property-create-slice';
import fileReducer from './features/files/files-slice';
import propertyListReducer from './features/property-list/property-list-slice';
import unitListReducer from './features/unit-list/unit-list-slice';
import propertyDetailsReducer from './features/property-details/property-details.slice';
import unitDetailsSliceReducer from './features/unit-details/unit-details.slice';
import propertySearchReducer from './features/property-search/property-search-slice';
import userPreferenceReducer from './features/user-preference/user-preference-slice';
import personalProfileReducer from './features/personal-profile/personal-profile-slice';
import offerGenerationReducer from './features/offer-generation/offer-generation-slice';
import appReducer from './features/app/app-slice';
import authReducer from './features/auth/auth-slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// Import from redux persist FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { appApi } from './api';

/**
 * ### App wide combined Reducers
 * any reducers that will be used app wide should be declared here
 *
 * `Type of Reducers ( STORE, API )` \
 * `STORE = app wide store's` \
 * `API = app wide API's`
 */
export const rootReducers = combineReducers({
  // STORE
  app: appReducer,
  auth: authReducer,
  'property-list': propertyListReducer,
  'property-create': propertyCreateReducer,
  'property-details': propertyDetailsReducer,
  'unit-details': unitDetailsSliceReducer,
  'unit-list': unitListReducer,
  'property-search': propertySearchReducer,
  'personal-profile': personalProfileReducer,
  'user-preference': userPreferenceReducer,
  'offer-generation': offerGenerationReducer,
  file: fileReducer,

  // API
  [appApi.reducerPath]: appApi.reducer,
});

/**
 * ### Persisted Storage Configuration
 *
 * localStorage key = `'root'`
 *
 * only `auth` store is persisted in localStorage by default
 *
 * append on `whitelist` the key string of specific reducer defined in `rootReducers`
 * 
    ````javascript
    {
      key: "root",
      storage: storage,
      whitelist: ["auth", <reducer key>]
    }
    ````
 */
const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth', 'user-preference', 'app'],
};

/**
 * ### Implementation of persistReducer
 */
const reducersWithPersist = persistReducer(persistConfig, rootReducers);

/**
 * ### Implementation of Redux Toolkit Store
 */
export const store = configureStore({
  reducer: reducersWithPersist,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      //  {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}
    }).concat(appApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
