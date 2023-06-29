import * as yup from 'yup';

export const genericResolver = {
  name: yup.string().required('Name is required!'),
  yearBuilt: yup.number().typeError('Year built is required!').required('Year built is required!'),
  peza: yup.number().typeError('PEZA is required!').required('PEZA is required!'),
  operatingHours: yup.boolean().required('Operating hours is required!'),
  grossBuildingSize: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .typeError('Gross building size is required!')
    .required('Gross building size is required!')
    .min(1, 'Gross building size is required!'),
  grossLeasableSize: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .typeError('Gross leasable size is required!')
    .required('Gross leasable size is required!')
    .min(1, 'Gross leasable size is required!'),
  typicalFloorPlateSize: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .typeError('Typical floor plate size is required!')
    .required('Typical floor plate size is required!')
    .min(1, 'Typical floor plate size is required!'),
  totalFloors: yup.number().typeError('Total floors is required!').required('Total floors is required!'),
  totalUnits: yup.number().typeError('Total units is required!').required('Total units is required!'),
  efficiencyRatio: yup.number().typeError('Efficiency ratio is required!').required('Efficiency ratio is required!'),
  densityRatio: yup.number().typeError('Density ratio is required!').required('Density ratio is required!'),
  ownershipTypeID: yup.number().typeError('Owner is required').required('Owner is required'),
  projectStatusID: yup.number().typeError('Project status is required').required('Project status is required'),
};

export const saveBuildingResolver = yup.object().shape({
  name: genericResolver.name,
  yearBuilt: genericResolver.yearBuilt,
  peza: genericResolver.peza,
  operatingHours: genericResolver.operatingHours,
  grossBuildingSize: genericResolver.grossBuildingSize,
  grossLeasableSize: genericResolver.grossLeasableSize,
  typicalFloorPlateSize: genericResolver.typicalFloorPlateSize,
  totalFloors: genericResolver.totalFloors,
  totalUnits: genericResolver.totalUnits,
  efficiencyRatio: genericResolver.efficiencyRatio,
  densityRatio: genericResolver.densityRatio,
  ownershipTypeID: genericResolver.ownershipTypeID,
  projectStatusID: genericResolver.projectStatusID,
});
