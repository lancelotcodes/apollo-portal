import * as yup from 'yup';

export const genericResolver = {
  name: yup.string().required('Name is required!'),
};

export const saveMandateResolver = yup.object().shape({
  name: genericResolver.name,
});
