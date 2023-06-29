import * as yup from 'yup';

export const genericResolver = {
  name: yup.string().nullable().required('Name is required!'),
  contactID: yup.number().required('Contact is required!'),
  brokerCompanyID: yup.number().required('Agent company is required!'),
  brokerID: yup.number().required('Agent is required!'),
  tenantClassificationID: yup
    .number()
    .typeError('Tenant classification is required!')
    .required('Tenant classification is required!'),
  companyID: yup.number().required('Company is required!'),
  closingRate: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Closing rate is required!')
    .min(1, 'Closing rate is required!'),
  estimatedArea: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Estimated area is required!')
    .min(1, 'Estimated area is required!'),
};

export const tenantDetailsResolver = yup.object().shape({
  name: genericResolver.name,
  contactID: genericResolver.contactID,
  brokerCompanyID: genericResolver.brokerCompanyID,
  tenantClassificationID: genericResolver.tenantClassificationID,
  brokerID: genericResolver.brokerID,
  companyID: genericResolver.companyID,
  estimatedArea: genericResolver.estimatedArea,
  closingRate: genericResolver.closingRate,
});
