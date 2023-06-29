import * as yup from 'yup';
export const genericResolver = {
  name: yup.string().required('Floor name is required!'),
  sort: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .typeError('Sort is required!')
    .required('Sort is required!')
    .min(1, 'Sort is required!'),
  floorPlateSize: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.toString().replace(/\D/g, '')))
    .typeError('Floor plate size is required!')
    .required('Floor plate size is required!')
    .min(1, 'Floor plate size is required!'),
};
export const saveFloorResolver = yup.object().shape({
  name: genericResolver.name,
  sort: genericResolver.sort,
  floorPlateSize: genericResolver.floorPlateSize,
});
