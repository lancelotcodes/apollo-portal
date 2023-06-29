import { serializeQuery } from '@/helpers/UrlHelper/query-param';
import { appApi } from '..';
import { GenericCreateEntityResponse, GenericResponseType } from '../types/generic/http-types';
import {
  BuildingFloorUnits,
  BuildingUnitById,
  FloorParam,
  FloorRequest,
  FloorsByBuildingId,
  PropertyContractRequest,
  PropertyContractsById,
  StackingPlanSummary,
  UnitParam,
  UnitRequest,
  UnitsByBuildingIdDetails,
} from './stacking-types';

const stackingApi = appApi
  .enhanceEndpoints({
    addTagTypes: ['Stacking'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      floorsByBuildingId: build.query<
        GenericResponseType<FloorsByBuildingId[]>,
        { Id: number | undefined; param?: FloorParam }
      >({
        providesTags: [{ type: 'Stacking', id: `Building-Floors` }],
        query: ({ Id, param }) => {
          return {
            url:
              `/building/${Id}/floors?` +
              serializeQuery({
                Status: param?.Status || 'All',
                ExpiryYears: param?.ExpiryYears,
                Search: param?.Search,
              }),
            method: 'Get',
          };
        },
      }),
      unitsByBuildingId: build.query<
        GenericResponseType<UnitsByBuildingIdDetails>,
        { Id: number | undefined; param?: UnitParam }
      >({
        providesTags: [{ type: 'Stacking', id: `Building-Units` }],
        query: ({ Id, param }) => {
          return {
            url:
              `/building/${Id}/units?` +
              serializeQuery({
                PageNumber: param?.PageNumber || 1,
                PageSize: param?.PageSize || 10,
                Search: param?.Search,
                ExpiryYears: param?.ExpiryYears,
                Status: param?.Status,
              }),
            method: 'Get',
          };
        },
      }),
      floorUnitsByFloorId: build.query<GenericResponseType<BuildingFloorUnits>, number | string | undefined>({
        providesTags: [{ type: 'Stacking', id: `Building-Floor-Units` }],
        query: (id) => ({
          url: `/building/floor/${id}`,
          method: 'Get',
        }),
      }),
      buildingFloorUnitById: build.query<GenericResponseType<BuildingUnitById>, number | string | null>({
        providesTags: [{ type: 'Stacking', id: `Unit-Details` }],
        query: (id) => ({
          url: `/building/unit/${id}`,
          method: 'Get',
        }),
      }),
      stackingPlanSummaryBuildingId: build.query<GenericResponseType<StackingPlanSummary[]>, number | string | null>({
        providesTags: [{ type: 'Stacking', id: `Summary-List` }],
        query: (id) => ({
          url: `/building/stackingplan/summary/${id}`,
          method: 'Get',
        }),
      }),
      saveFloor: build.mutation<GenericResponseType<GenericCreateEntityResponse<number>>, FloorRequest>({
        query: (payload) => ({
          url: `/building/floor/save`,
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'Stacking', id: `Building-Floors` },
          { type: 'Stacking', id: `Building-Units` },
        ],
      }),
      saveUnit: build.mutation<GenericResponseType<GenericCreateEntityResponse<number>>, UnitRequest>({
        query: (payload) => ({
          url: `/building/unit/save`,
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Stacking', id: `Unit-Details` }],
      }),
      saveUnits: build.mutation<GenericResponseType<GenericCreateEntityResponse<number>>, { units: UnitRequest[] }>({
        query: (payload) => ({
          url: `/building/units/save`,
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [
          { type: 'Stacking', id: `Building-Units` },
          { type: 'Stacking', id: `Building-Floors` },
        ],
      }),
      propertyContractsById: build.query<GenericResponseType<PropertyContractsById[]>, number | string | undefined>({
        providesTags: [{ type: 'Stacking', id: `Contract-List` }],
        query: (id) => ({
          url: `/property/contracts/${id}`,
          method: 'Get',
        }),
      }),
      savePropertyContract: build.mutation<
        GenericResponseType<GenericCreateEntityResponse<number>>,
        PropertyContractRequest
      >({
        query: (payload) => ({
          url: `/property/contract/save`,
          method: 'Post',
          body: payload,
        }),
        invalidatesTags: () => [{ type: 'Stacking', id: `Contract-List` }],
      }),
    }),
  });

export const {
  useFloorsByBuildingIdQuery,
  useLazyFloorsByBuildingIdQuery,
  useUnitsByBuildingIdQuery,
  useLazyUnitsByBuildingIdQuery,
  useFloorUnitsByFloorIdQuery,
  useLazyFloorUnitsByFloorIdQuery,
  useBuildingFloorUnitByIdQuery,
  useLazyBuildingFloorUnitByIdQuery,
  useStackingPlanSummaryBuildingIdQuery,
  useSaveFloorMutation,
  useSaveUnitMutation,
  useSaveUnitsMutation,
  usePropertyContractsByIdQuery,
  useSavePropertyContractMutation,
} = stackingApi;
