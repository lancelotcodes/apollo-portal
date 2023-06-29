import * as yup from 'yup';

export const genericResolver = {
  name: yup.string().required('Name is required!'),
  propertyTypeID: yup.number().required('Property is required!'),
  gradeID: yup.number().required('Grade is required!'),
};

export const createPropertyResolver = yup.object().shape({
  name: genericResolver.name,
  propertyTypeID: genericResolver.propertyTypeID,
  gradeID: genericResolver.gradeID,
});
