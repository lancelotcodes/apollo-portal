import { appApi } from '..';
import { GenericCreateEntityResponse, GenericResponseType } from '../types/generic/http-types';
import {
  BuildingDetails,
  PropertyParams,
  PropertyList,
  PropertyAddress,
  PropertyMap,
  PropertyShort,
  GradeDetails,
  CreatePropertyRequest,
  PropertyResponse,
  PropertyTypeDetails,
  SavePropertyLocationRequest,
  SavePropertyBuildingRequest,
  SavePropertyAgentRequest,
  AgentDetails,
  PropertyAgentsDetails,
  ConfirmPropertyRequest,
  PropertySEOResponse,
  PropertySEORequest,
  PropertyVideoResponse,
  PropertyDocumentResponse,
  PropertyMandateResponse,
  PropertyMandateRequest,
  PropertyVideoRequest,
  PropertyImagesRequest,
  DeletePropertyRequest,
  DeletePropertyAgentRequest,
} from './property-type';

const buildingsApi = appApi
  .enhanceEndpoints({
    addTagTypes: ['Property'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // Get Property
      propertyList: build.query<GenericResponseType<PropertyList>, PropertyParams>({
        providesTags: () => [{ type: 'Property', id: `List` }],
        query: (payload) => {
          const { PageNumber, PageSize, ...rest } = payload;
          return {
            url: '/property/list',
            params: {
              PageNumber: PageNumber || 1,
              PageSize: PageSize || 10,
              ...rest,
            },
            method: 'GET',
          };
        },
      }),
      propertyMap: build.query<GenericResponseType<PropertyMap[]>, PropertyParams>({
        providesTags: () => [{ type: 'Property', id: `Map` }],
        query: () => {
          return {
            url: '/property/map',
            method: 'GET',
          };
        },
      }),
      buildingByID: build.query<GenericResponseType<BuildingDetails>, number | undefined | null>({
        providesTags: () => [{ type: 'Property', id: `building` }],
        query: (payload) => ({
          url: `/property/building/${payload}`,
          method: 'GET',
        }),
      }),
      propertyAddressByID: build.query<GenericResponseType<PropertyAddress>, number | undefined | null>({
        providesTags: () => [{ type: 'Property', id: `Adress` }],
        query: (payload) => ({
          url: `/property/address/${payload}`,
          method: 'GET',
        }),
      }),
      propertyTypesList: build.query<GenericResponseType<PropertyTypeDetails[]>, null | undefined>({
        providesTags: [{ type: 'Property', id: `Types-list` }],
        query: () => ({
          url: `/property/property-types/list`,
          method: 'GET',
        }),
      }),
      propertyByID: build.query<GenericResponseType<PropertyResponse>, number | undefined | null>({
        providesTags: () => [{ type: 'Property', id: `Property-Details` }],
        query: (propertyID) => ({
          url: `/property/${propertyID}`,
          method: 'Get',
        }),
      }),
      propertyShortList: build.query<GenericResponseType<PropertyShort[]>, null | undefined>({
        providesTags: [{ type: 'Property', id: `Short-list` }],
        query: () => ({
          url: `/property/short/list`,
          method: 'Get',
        }),
      }),
      gradeList: build.query<GenericResponseType<GradeDetails[]>, number | undefined>({
        providesTags: () => [{ type: 'Property', id: `Grade-list` }],
        query: (propertytypeid) => ({
          url: `/grade/list/${propertytypeid}`,
          method: 'Get',
        }),
      }),
      agentList: build.query<GenericResponseType<AgentDetails[]>, null | undefined>({
        providesTags: () => [{ type: 'Property', id: `Agent-list` }],
        query: () => ({
          url: `/agent/list`,
          method: 'Get',
        }),
      }),
      agentsByPropertyID: build.query<GenericResponseType<PropertyAgentsDetails[]>, number | undefined | null>({
        providesTags: () => [{ type: 'Property', id: `PropertyAgent-list` }],
        query: (payload) => ({
          url: `/property/agents/${payload}`,
          method: 'Get',
        }),
      }),
      propertySEO: build.query<GenericResponseType<PropertySEOResponse>, number | string | undefined | null>({
        providesTags: () => [{ type: 'Property', id: `propertySEO` }],
        query: (payload) => ({
          url: `/property/seo/${payload}`,
          method: 'Get',
        }),
      }),
      propertyVideoByID: build.query<GenericResponseType<PropertyVideoResponse>, number | undefined | null>({
        query: (payload) => ({
          url: `/property/video/${payload}`,
          method: 'Get',
        }),
        providesTags: (_) => ['propertyVideo'],
      }),
      propertyDocumentsByID: build.query<GenericResponseType<PropertyDocumentResponse[]>, number | undefined | null>({
        query: (payload) => ({
          url: `/property/documents/${payload}`,
          method: 'Get',
        }),
        providesTags: (_) => ['propertyDocument'],
      }),
      propertyMandateByID: build.query<GenericResponseType<PropertyMandateResponse[]>, number | undefined | null>({
        query: (payload) => ({
          url: `/property/mandates/${payload}`,
          method: 'Get',
        }),
        providesTags: (_) => ['propertyMandate'],
      }),
      createProperty: build.mutation<GenericResponseType<GenericCreateEntityResponse<number>>, CreatePropertyRequest>({
        query: (payload) => ({
          url: `/property/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: () => [
          { type: 'Property', id: `Property-Details` },
          { type: 'Property', id: `List` },
        ],
      }),
      deleteProperty: build.mutation<GenericResponseType<boolean>, DeletePropertyRequest>({
        query: (payload) => ({
          url: `/property/delete`,
          body: payload,
          method: 'Delete',
        }),
        invalidatesTags: () => [
          { type: 'Property', id: `Property-Details` },
          { type: 'Property', id: `List` },
        ],
      }),

      savePropertyLocation: build.mutation<
        GenericResponseType<GenericCreateEntityResponse<number>>,
        SavePropertyLocationRequest
      >({
        query: (payload) => ({
          url: `/property/address/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: () => [{ type: 'Property', id: `Adress` }],
      }),

      // Save Building
      savePropertyBuilding: build.mutation<
        GenericResponseType<GenericCreateEntityResponse<SavePropertyBuildingRequest>>,
        SavePropertyBuildingRequest
      >({
        query: (payload) => ({
          url: `/property/building/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: () => [{ type: 'Property', id: `building` }],
      }),
      // Save Agent
      savePropertyAgent: build.mutation<GenericResponseType<AgentDetails[]>, SavePropertyAgentRequest>({
        query: (payload) => ({
          url: `/agent/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: () => [{ type: 'Property', id: `PropertyAgent-list` }],
      }),
      deletePropertyAgent: build.mutation<GenericResponseType<boolean>, DeletePropertyAgentRequest>({
        query: (payload) => ({
          url: `/agent/delete`,
          body: payload,
          method: 'Delete',
        }),
        invalidatesTags: () => [{ type: 'Property', id: `PropertyAgent-list` }],
      }),
      savePropertySEO: build.mutation<
        GenericResponseType<GenericCreateEntityResponse<PropertySEORequest>>,
        PropertySEORequest
      >({
        query: (payload) => ({
          url: `/property/seo/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: () => [{ type: 'Property', id: `propertySEO` }],
      }),
      propertyConfirm: build.mutation<
        GenericResponseType<GenericCreateEntityResponse<ConfirmPropertyRequest>>,
        ConfirmPropertyRequest
      >({
        query: (payload) => ({
          url: `/property/confirm`,
          body: payload,
          method: 'Post',
        }),
      }),
      savePropertyMandate: build.mutation<
        GenericResponseType<PropertyMandateResponse[]>,
        PropertyMandateRequest[] | null | undefined
      >({
        query: (payload) => ({
          url: `/property/mandate/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: (_) => ['propertyMandate'],
      }),
      savePropertyVideo: build.mutation<GenericResponseType<boolean>, PropertyVideoRequest | null | undefined>({
        query: (payload) => ({
          url: `/property/video/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: (_) => ['propertyVideo'],
      }),
      savePropertyImages: build.mutation<GenericResponseType<boolean>, PropertyImagesRequest | null | undefined>({
        query: (payload) => ({
          url: `/property/documents/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: (_) => ['propertyDocument'],
        // invalidatesTags: () => [{ type: 'Property', id: `propertyDocument` }],
      }),
    }),
  });
export const {
  usePropertyListQuery,
  useBuildingByIDQuery,
  usePropertyAddressByIDQuery,
  usePropertyTypesListQuery,
  usePropertyByIDQuery,
  useLazyPropertyByIDQuery,
  usePropertyShortListQuery,
  useGradeListQuery,
  useLazyGradeListQuery,
  usePropertyMapQuery,
  useCreatePropertyMutation,
  useDeletePropertyMutation,
  useSavePropertyLocationMutation,
  useSavePropertyBuildingMutation,
  useSavePropertyAgentMutation,
  useDeletePropertyAgentMutation,
  useAgentListQuery,
  useAgentsByPropertyIDQuery,
  usePropertyConfirmMutation,
  usePropertySEOQuery,
  useSavePropertySEOMutation,
  usePropertyDocumentsByIDQuery,
  useSavePropertyImagesMutation,
  usePropertyVideoByIDQuery,
  useSavePropertyVideoMutation,
  usePropertyMandateByIDQuery,
  useSavePropertyMandateMutation,
} = buildingsApi;
