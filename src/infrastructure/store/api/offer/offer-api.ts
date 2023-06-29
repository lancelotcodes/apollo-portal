import { serializeQuery } from '@/helpers/UrlHelper/query-param';
import { appApi } from '..';
import { GenericResponseType } from '../types/generic/http-types';
import { OfferOptionParam, OfferOptionResponse, SendOfferOnEmailRequest } from './offer-type';

const offerApi = appApi
  .enhanceEndpoints({
    addTagTypes: ['Offer'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      offerOption: build.query<GenericResponseType<OfferOptionResponse[]>, OfferOptionParam>({
        providesTags: [{ type: 'Offer', id: `Offers` }],
        query: (param) => {
          return {
            url:
              `/offer/options?` +
              serializeQuery({
                PropertyTypeID: param?.PropertyTypeID,
                ListingTypeID: param?.ListingTypeID,
                HandOverConditionID: param?.HandOverConditionID,
                MinSize: param?.MinSize,
                MaxSize: param?.MaxSize,
                PEZA: param?.PEZA,
                OperatingHours: param?.OperatingHours,
                ProvinceIds: param.ProvinceIds,
                CitiesIds: param?.CitiesIds,
                SubMarketsIds: param?.SubMarketsIds,
                AgentID: param?.AgentID,
              }),
            method: 'Get',
          };
        },
      }),
      saveSendOfferOnEmail: build.mutation<GenericResponseType<number>, SendOfferOnEmailRequest>({
        query: (payload) => ({
          url: `/offer/send-offer-in-email`,
          body: payload,
          method: 'Post',
        }),
      }),
    }),
  });

export const { useOfferOptionQuery, useLazyOfferOptionQuery, useSaveSendOfferOnEmailMutation } = offerApi;
