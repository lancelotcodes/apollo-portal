import * as yup from 'yup';

export const genericResolver = {
  name: yup.string().nullable().required('Name is required!'),
  floorID: yup.number().typeError('Floor is required!').required('Floor is required!'),
  unitStatusID: yup.number().typeError('Status is required!').required('Status is required!'),
  availabilityID: yup.number().typeError('Availability is required!').required('Availability is required!'),
  listingTypeID: yup.number().typeError('Listing Type is required!').required('Listing type is required!'),
  unitNumber: yup.string().typeError('Unit number is required!').required('Unit number is required!'),
  leaseFloorArea: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Floor area is required!')
    .min(1, 'Floor area is required!'),
  basePrice: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Base price is required!')
    .min(1, 'Base price is required!'),
  cusa: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Cusa is required!')
    .min(1, 'Cusa is required!'),
  minimumLeaseTerm: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Lease term is required!')
    .min(1, 'Lease term is required!'),
  parkingRent: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Parking tent is required!')
    .min(1, 'Parking tent is required!'),
  acCharges: yup.string().nullable().required('AC charges is required!'),
  acExtensionCharges: yup.string().nullable().required('AC extension charges is required!'),
  escalationRate: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .required('Escalation rate is required!')
    .min(1, 'Escalation rate is required!'),
  handOverConditionID: yup
    .number()
    .typeError('Hand over condition is required!')
    .required('Hand over condition is required!'),
};

export const unitDetailsResolver = yup.object().shape({
  name: genericResolver.name,
  floorID: genericResolver.floorID,
  unitStatusID: genericResolver.unitStatusID,
  availabilityID: genericResolver.availabilityID,
  listingTypeID: genericResolver.listingTypeID,
  unitNumber: genericResolver.unitNumber,
  leaseFloorArea: genericResolver.leaseFloorArea,
  basePrice: genericResolver.basePrice,
  cusa: genericResolver.cusa,
  minimumLeaseTerm: genericResolver.minimumLeaseTerm,
  parkingRent: genericResolver.parkingRent,
  acExtensionCharges: genericResolver.acExtensionCharges,
  acCharges: genericResolver.acCharges,
  escalationRate: genericResolver.escalationRate,
  handOverConditionID: genericResolver.handOverConditionID,
});
