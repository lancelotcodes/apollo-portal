import { appApi } from '..';
import { DocumentRequest } from '../property/property-type';
import { GenericResponseType } from '../types/generic/http-types';
import { FileRequest, FileResponse } from './files-type';

const filesApi = appApi
  .enhanceEndpoints({
    addTagTypes: ['File'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      saveDocument: build.mutation<GenericResponseType<FileResponse[]>, FileRequest | null>({
        query: (payload) => ({
          url: `/document/save`,
          body: payload,
          method: 'Post',
        }),
      }),
      updateDocument: build.mutation<GenericResponseType<DocumentRequest>, DocumentRequest>({
        query: (payload) => ({
          url: `/document/update`,
          body: payload,
          method: 'Put',
        }),
      }),
      deleteDocumentById: build.mutation<GenericResponseType<boolean>, number | undefined>({
        query: (payload) => ({
          url: `/document/${payload}`,
          body: payload,
          method: 'Delete',
        }),
        invalidatesTags: (_) => ['propertyDocument'],
      }),
    }),
  });

export const { useSaveDocumentMutation, useUpdateDocumentMutation, useDeleteDocumentByIdMutation } = filesApi;
