import * as yup from 'yup';

export const offerSearchFormResolver = yup.object().shape({
  PropertyTypeID: yup.number().required('Property type is required'),
  ProvinceIds: yup.array().of(yup.number()),
  CitiesIds: yup.array().of(yup.number()),
  SubMarketsIds: yup.array().of(yup.number()),
  ListingTypeID: yup.number(),
  HandOverConditionID: yup.number(),
  AgentID: yup.number(),
  PEZA: yup.number(),
  MinSize: yup.number().transform((value) => (isNaN(value) || value === null || value === undefined ? 0 : value)),
  MaxSize: yup.number().transform((value) => (isNaN(value) || value === null || value === undefined ? 0 : value)),
  OperatingHours: yup.boolean(),
});

export type offerSearchFormType = {
  PropertyTypeID?: number;
  ListingTypeID?: number;
  HandOverConditionID?: number;
  AgentID?: number;
  MinSize?: number;
  MaxSize?: number;
  ProvinceIds?: number[];
  CitiesIds?: number[];
  SubMarketsIds?: number[];
  PEZA?: number;
  OperatingHours?: boolean;
};
