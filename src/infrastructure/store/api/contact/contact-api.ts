import { appApi } from '..';
import { GenericResponseType } from '../types/generic/http-types';
import { ContactRequest, ContactResponse } from './contact-type';

const contactApi = appApi
  .enhanceEndpoints({
    addTagTypes: ['Contact'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      contactList: build.query<GenericResponseType<ContactResponse[]>, null | undefined>({
        providesTags: [{ type: 'Contact', id: `Contact-List` }],
        query: () => ({
          url: `/contact/list`,
          method: 'Get',
        }),
      }),
      contactListByCompanyID: build.query<GenericResponseType<ContactResponse[]>, number>({
        providesTags: [{ type: 'Contact', id: `Company-Contact-List` }],
        query: (companyID) => ({
          url: `/contact/${companyID}/list`,
          method: 'Get',
        }),
      }),
      saveContact: build.mutation<GenericResponseType<number>, ContactRequest>({
        query: (payload) => ({
          url: `/contact/save`,
          body: payload,
          method: 'Post',
        }),
        invalidatesTags: () => [
          { type: 'Contact', id: `Contact-List` },
          { type: 'Contact', id: `Company-Contact-List` },
        ],
      }),
    }),
  });

export const {
  useContactListQuery,
  useLazyContactListQuery,
  useContactListByCompanyIDQuery,
  useLazyContactListByCompanyIDQuery,
  useSaveContactMutation,
} = contactApi;
