import * as yup from 'yup';

export const NewReportSchema = yup.object().shape({
  incident: yup.object().required('Requerido'),
  description: yup.string().trim().required('Requerido'),
  address: yup.string().trim().required('Requerido'),
});
