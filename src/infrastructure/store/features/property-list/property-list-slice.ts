import {
  PropertyListViewMode,
  PropertySortByMode,
  FilterPropertyListOptions,
  PropertyGroupByMode,
  PropertyListState,
  RemoveFilterPayload,
} from './property-list-type';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit';
import {
  BuildingDetails,
  PropertyAddress,
  PropertyAgentsDetails,
  PropertyDocumentResponse,
  PropertyMandateResponse,
  PropertyResponse,
  PropertySEOResponse,
  PropertyVideoResponse,
  SavePropertyLocationRequest,
} from '../../api/property/property-type';

const initialState: PropertyListState = {
  viewMode: 'grid',
  createNewItemDialogOpen: false,
  createNewClientTypeToggle: {
    createNewClientDialogOpen: false,
    newClientTypeName: '',
  },
  paginationIndex: 1,
  selectedPropertyInfo: null,
  selectedPropertyAgents: [],
  selectedProperty: null,
  selectedPropertyAddress: null,
  selectedPropertySEO: null,
  selectedPropertyVideo: null,
  selectedPropertyDocuments: [],
  selectedPropertyMandate: [],
  selectedPropertyDetailsLoading: false,
  groupBy: {
    City: false,
    Submarket: false,
    Microdistrict: false,
    Project: false,
    Class: false,
  },
  sortBy: {
    'Tower name: A to Z': false,
    'Tower name: Z to A': false,
    'Last updated': false,
    'Last created': false,
    'City: A to Z': false,
    'City: Z to A': false,
  },
  search: '',
  filter: {
    city: null,
    submarket: null,
    microdistrict: null,
    grade: null,
    location: '',
    classification: [],
    propertyType: null,
    published: 'Show All',
  },
};

const propertyListSlice = createSlice({
  name: 'property-list',
  initialState,
  reducers: {
    toggleViewMode: (state, action: PayloadAction<PropertyListViewMode>) => {
      state.viewMode = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      (state.paginationIndex = 1),
        (state.filter = {
          city: null,
          submarket: null,
          microdistrict: null,
          grade: null,
          location: '',
          classification: [],
          propertyType: null,
          published: 'Show All',
        });
    },
    toggleGroup: (state, action: PayloadAction<PropertyGroupByMode>) => {
      const group = state.groupBy[action.payload];

      if (typeof group === 'boolean') {
        state.groupBy[action.payload] = !group;
      }
    },
    toggleSort: (state, action: PayloadAction<PropertySortByMode>) => {
      const sort = state.sortBy[action.payload];

      if (typeof sort === 'boolean') {
        state.sortBy = { ...initialState.sortBy, [action.payload]: !sort };
      }
    },
    toggleCreateNewItemDialog: (state, action: PayloadAction<boolean | undefined>) => {
      state.createNewItemDialogOpen = action.payload ?? !state.createNewItemDialogOpen;
    },
    toggleCreateNewClientDialog: (
      state,
      action: PayloadAction<{ createNewClientDialogOpen: boolean; newClientTypeName: string }>,
    ) => {
      state.createNewClientTypeToggle.createNewClientDialogOpen =
        action.payload.createNewClientDialogOpen ?? !state.createNewClientTypeToggle.createNewClientDialogOpen;
      state.createNewClientTypeToggle.newClientTypeName = action.payload.newClientTypeName;
    },
    setPaginationIndex: (state, action: PayloadAction<number>) => {
      state.paginationIndex = action.payload;
    },

    setFilter: (state, action: PayloadAction<FilterPropertyListOptions>) => {
      state.filter = action.payload;
    },

    removeFilter: (state, action: PayloadAction<RemoveFilterPayload>) => {
      if (action.payload.action === 'location') {
        state.filter.location = '';
      }

      if (action.payload.action === 'classification') {
        state.filter.classification = state.filter.classification.filter((e) => {
          if (action.payload.data) {
            e !== action.payload.data.classification;
          }
        });
      }

      state.filter.published = 'Show All';
    },

    setSelectedPropertyInfo: (state, action: PayloadAction<PropertyResponse | null>) => {
      if (action.payload === null) {
        state.selectedPropertyInfo = action.payload;
        return;
      }

      state.selectedPropertyInfo = { ...state.selectedPropertyInfo, ...action.payload };
    },
    setSelectedProperty: (state, action: PayloadAction<BuildingDetails | null>) => {
      if (action.payload === null) {
        state.selectedProperty = action.payload;
        return;
      }

      state.selectedProperty = { ...state.selectedProperty, ...action.payload };
    },

    setSelectedPropertyAddress: (
      state,
      action: PayloadAction<PropertyAddress | SavePropertyLocationRequest | null>,
    ) => {
      if (action.payload === null) {
        state.selectedPropertyAddress = action.payload;
        return;
      }

      state.selectedPropertyAddress = { ...state.selectedPropertyAddress, ...action.payload };
    },
    setSelectedPropertyAgents: (state, action: PayloadAction<PropertyAgentsDetails[] | null>) => {
      if (action.payload === null || action.payload.length === 0) {
        state.selectedPropertyAgents = action.payload;
        return;
      }
      state.selectedPropertyAgents = action.payload;
      // state.selectedPropertyAgents = [...(<[]>state.selectedPropertyAgents), ...action.payload];
    },
    setSelectedPropertySEO: (state, action: PayloadAction<PropertySEOResponse | null>) => {
      if (action.payload === null) {
        state.selectedPropertySEO = action.payload;
        return;
      }

      state.selectedPropertySEO = { ...state.selectedPropertySEO, ...action.payload };
    },
    setSelectedPropertyVideo: (state, action: PayloadAction<PropertyVideoResponse | null>) => {
      if (action.payload === null) {
        state.selectedPropertyVideo;
        return;
      }
      state.selectedPropertyVideo = { ...state.selectedPropertyVideo, ...action.payload };
    },
    setSelectedPropertyDocuments: (state, action: PayloadAction<PropertyDocumentResponse[] | null>) => {
      if (action.payload === null) {
        state.selectedPropertyDocuments = action.payload;
        return;
      }
      state.selectedPropertyDocuments = action.payload;
    },
    setSelectedPropertyMandate: (state, action: PayloadAction<PropertyMandateResponse[] | null>) => {
      if (action.payload === null) {
        state.selectedPropertyMandate = action.payload;
        return;
      }
      state.selectedPropertyMandate = action.payload;
    },
    setSelectedPropertyDetailsLoading: (state, action: PayloadAction<boolean | null>) => {
      if (action.payload === true) {
        state.selectedPropertyDetailsLoading = action.payload;
        return;
      }
      state.selectedPropertyDetailsLoading = false;
    },
  },
});

export const {
  toggleViewMode,
  toggleCreateNewItemDialog,
  toggleCreateNewClientDialog,
  setSearchValue,
  toggleGroup,
  setFilter,
  toggleSort,
  setPaginationIndex,
  removeFilter,
  setSelectedPropertyInfo,
  setSelectedPropertyAgents,
  setSelectedProperty,
  setSelectedPropertyAddress,
  setSelectedPropertySEO,
  setSelectedPropertyVideo,
  setSelectedPropertyDocuments,
  setSelectedPropertyMandate,
  setSelectedPropertyDetailsLoading,
} = propertyListSlice.actions;
export default propertyListSlice.reducer;
