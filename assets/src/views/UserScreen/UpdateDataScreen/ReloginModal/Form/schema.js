import * as yup from 'yup';

export const ReloginSchema = yup.object().shape({
  password: yup.string().trim().required('Requerido'),
});
