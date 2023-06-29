import * as yup from 'yup';

export const genericResolver = {
  documentName: yup.string().required('Video name is required!'),
  documentPath: yup.string().required('Video link is required!'),
};

export const saveVideoResolver = yup.object().shape({
  documentName: genericResolver.documentName,
  documentPath: genericResolver.documentPath,
});
