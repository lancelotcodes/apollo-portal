import * as yup from 'yup';

export const genericResolver = {
  leaseFloorArea: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, ''))),
  basePrice: yup.number().transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, ''))),
  cusa: yup.number().transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, ''))),
  acExtensionCharges: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, ''))),
  acCharges: yup.number().transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, ''))),
  escalationRate: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, ''))),
  minimumLeaseTerm: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, ''))),
};

export const multiUnitDetailsResolver = yup.object().shape({
  leaseFloorArea: genericResolver.leaseFloorArea,
  basePrice: genericResolver.basePrice,
  cusa: genericResolver.cusa,
  acExtensionCharges: genericResolver.cusa,
  acCharges: genericResolver.cusa,
  escalationRate: genericResolver.cusa,
  minimumLeaseTerm: genericResolver.minimumLeaseTerm,
});
