import { appApi } from '..';
import { ISelectOption } from '../lookup/lookup-type';
import { GenericResponseType } from '../types/generic/http-types';
import { CompanyRequest } from './company-type';

const companyApi = appApi
  .enhanceEndpoints({
    addTagTypes: ['Company'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      companyList: build.query<GenericResponseType<ISelectOption[]>, null | undefined>({
        providesTags: [{ type: 'Company', id: `Company-list` }],
        query: () => ({
          url: `/company/list/`,
          method: 'Get',
        }),
      }),
      saveCompany: build.mutation<GenericResponseType<number>, CompanyRequest>({
        query: (payload) => ({
          url: `/company/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: () => [{ type: 'Company', id: `Company-list` }],
      }),
    }),
  });

export const { useCompanyListQuery, useSaveCompanyMutation } = companyApi;
