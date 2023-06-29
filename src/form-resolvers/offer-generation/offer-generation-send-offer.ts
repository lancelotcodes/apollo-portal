import * as yup from 'yup';

export interface OfferGenerationSendOfferFormType {
  client: string;
  offerOnEmail: string;
  subject: string;
  message: string;
  contactID?: number;
  companyID?: number;
  agentID?: number;
  templateType?: number;
  toEmail: string;
  ccEmail: string;
}

export const OfferGenerationSendOfferFormResolver = yup.object().shape({
  client: yup.string(),
  offerOnEmail: yup.string(),
  companyID: yup.number().when('client', {
    is: (val: string) => val === 'COMPANY',
    then: yup.number().typeError('Company is required!').required('Company is required!'),
  }),
  contactID: yup.number().typeError('Contact is required!').required('Contact is required!'),
  agentID: yup.number().typeError('Agent is required!').required('Agent is required!'),
  templateType: yup.number(),
  subject: yup.string().min(20, 'Type minimum 20 character!'),
  message: yup.string().min(50, 'Type minimum 50 character!'),
  toEmail: yup.string().when('offerOnEmail', {
    is: (val: string) => val === 'EMAILOFFER',
    then: yup.string().required('Email is required!'),
  }),
  // toEmail: yup.string().when('offerOnEmail', {
  //   is: (val: string) => val === 'EMAILOFFER',
  //   then: yup.string().required('Email is required!'),
  // }),
  // toEmail: yup.string().required('Email is required!'),
  ccEmail: yup.string(),
});

export interface NewCompanyFormType {
  name: string;
  email: string;
  company: string;
}
export interface NewContactFormType {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyID: number;
}

export const NewClientFormResolver = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
  company: yup.string(),
});
export const NewContactFormResolver = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  email: yup.string().required('Email is required!'),
});
