import * as yup from 'yup';

export const genericResolver = {
  cityID: yup.number().required('City is required!'),
  addressTag: yup.number().required('Address tag is required'),
  latitude: yup
    .number()
    .required('Latitude is required')
    .typeError('Latitude is required')
    .test('check', 'Not a valid latitude', function (value) {
      return value ? isFinite(value) && Math.abs(value) <= 90 : false;
    }),
  longitude: yup
    .number()
    .required('Longitude is required!')
    .typeError('Longitude is required')
    .test('check', 'Not a valid longitude', function (value) {
      return value ? isFinite(value) && Math.abs(value) <= 180 : false;
    }),
  line1: yup.string().required('Address 1 is required!'),
};

export const saveLocationResolver = yup.object().shape({
  cityID: genericResolver.cityID,
  addressTag: genericResolver.addressTag,
  latitude: genericResolver.latitude,
  longitude: genericResolver.longitude,
  line1: genericResolver.line1,
});
