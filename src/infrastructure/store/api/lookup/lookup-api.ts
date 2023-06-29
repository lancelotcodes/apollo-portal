import { serializeQuery } from '@/helpers/UrlHelper/query-param';
import { appApi } from '..';
import { GenericResponseType } from '../types/generic/http-types';
import { ISelectOption } from './lookup-type';

const lookupApi = appApi
  .enhanceEndpoints({
    addTagTypes: ['Lookup'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      provinceList: build.query<GenericResponseType<ISelectOption[]>, null | undefined>({
        providesTags: [{ type: 'Lookup', id: `Province-list` }],
        query: () => ({
          url: `/lookup/province/list`,
          method: 'Get',
        }),
      }),
      cityList: build.query<GenericResponseType<ISelectOption[]>, number | null | undefined>({
        providesTags: [{ type: 'Lookup', id: `City-list` }],
        query: (provinceId) => ({
          url: `${provinceId === null ? '/lookup/city/list' : `/lookup/city/list/${provinceId}`}`,
          method: 'Get',
        }),
      }),
      citiesByProvinceIds: build.query<GenericResponseType<ISelectOption[]>, number[] | undefined>({
        providesTags: [{ type: 'Lookup', id: `City-list` }],
        query: (provinceIds) => ({
          url:
            `/lookup/city/get-cities-by-provinces?` +
            serializeQuery({
              ProvinceIDs: provinceIds,
            }),
          method: 'Get',
        }),
      }),
      citySubMarketsList: build.query<GenericResponseType<ISelectOption[]>, number | undefined>({
        providesTags: (a, b, c) => [{ type: 'Lookup', id: `Submarkets-list ${c}` }],
        query: (cityID) => ({
          url: `/lookup/city/submarkets/list/${cityID}`,
          method: 'Get',
        }),
      }),
      citySubMarketsListByCityIds: build.query<GenericResponseType<ISelectOption[]>, number[] | undefined>({
        providesTags: (a, b, c) => [{ type: 'Lookup', id: `Submarkets-list ${c}` }],
        query: (cityIDs) => ({
          url:
            `/lookup/city/submarkets/list?` +
            serializeQuery({
              CityIDs: cityIDs,
            }),
          method: 'Get',
        }),
      }),
      cityMicroDistrictsList: build.query<GenericResponseType<ISelectOption[]>, number | undefined>({
        providesTags: (a, b, c) => [{ type: 'Lookup', id: `Microdistricts-list ${c}` }],
        query: (cityID) => ({
          url: `/lookup/city/microdistricts/list/${cityID}`,
          method: 'Get',
        }),
      }),
      cityMicroDistrictsListByCityIds: build.query<GenericResponseType<ISelectOption[]>, number | undefined>({
        providesTags: (a, b, c) => [{ type: 'Lookup', id: `Microdistricts-list ${c}` }],
        query: (cityIDs) => ({
          url:
            `/lookup/city/microdistricts/list?` +
            serializeQuery({
              CityIDs: cityIDs,
            }),
          method: 'Get',
        }),
      }),
      ownerShipTypeList: build.query<GenericResponseType<ISelectOption[]>, null | undefined>({
        providesTags: [{ type: 'Lookup', id: `Ownership-list` }],
        query: () => ({
          url: `/lookup/ownershiptype/list`,
          method: 'Get',
        }),
      }),
      projectStatusList: build.query<GenericResponseType<ISelectOption[]>, null | undefined>({
        providesTags: [{ type: 'Lookup', id: `Projectstatus-list` }],
        query: () => ({
          url: `/lookup/projectstatus/list`,
          method: 'Get',
        }),
      }),
      unitStatus: build.query<GenericResponseType<ISelectOption[]>, null>({
        providesTags: [{ type: 'Lookup', id: `Unit-Status` }],
        query: () => ({
          url: `/lookup/unitstatus/list`,
          method: 'Get',
        }),
      }),
      unitAvailability: build.query<GenericResponseType<ISelectOption[]>, null>({
        providesTags: [{ type: 'Lookup', id: `Unit-Availability` }],
        query: () => ({
          url: `/lookup/availability/list`,
          method: 'Get',
        }),
      }),
      unitListingType: build.query<GenericResponseType<ISelectOption[]>, null>({
        providesTags: [{ type: 'Lookup', id: `Unit-ListingType` }],
        query: () => ({
          url: `/lookup/listingtype/list`,
          method: 'Get',
        }),
      }),
      unitHandOverCondition: build.query<GenericResponseType<ISelectOption[]>, null>({
        providesTags: [{ type: 'Lookup', id: `Unit-HandOver-Condition` }],
        query: () => ({
          url: `/lookup/handovercondition/list`,
          method: 'Get',
        }),
      }),
      tenantClassificationList: build.query<GenericResponseType<ISelectOption[]>, null>({
        providesTags: [{ type: 'Lookup', id: `Tenant-Classification` }],
        query: () => ({
          url: `/lookup/tenantclassification/list`,
          method: 'Get',
        }),
      }),
      propertyTypesList: build.query<GenericResponseType<ISelectOption[]>, null>({
        providesTags: [{ type: 'Lookup', id: `Property-Types` }],
        query: () => ({
          url: `/property/property-types/list`,
          method: 'Get',
        }),
      }),
    }),
  });

export const {
  useProvinceListQuery,
  useCityListQuery,
  // useCityListByProvinceIdQuery,
  useCitiesByProvinceIdsQuery,
  useCitySubMarketsListQuery,
  useCitySubMarketsListByCityIdsQuery,
  // useSubMarketsListByCityIdsQuery,
  useCityMicroDistrictsListQuery,
  useCityMicroDistrictsListByCityIdsQuery,
  useOwnerShipTypeListQuery,
  useProjectStatusListQuery,
  useUnitStatusQuery,
  useUnitAvailabilityQuery,
  useUnitListingTypeQuery,
  useUnitHandOverConditionQuery,
  useTenantClassificationListQuery,
  usePropertyTypesListQuery,
} = lookupApi;
