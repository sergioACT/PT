import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  emailNumber: yup.string().trim().required('Requerido'),
  password: yup.string().trim().required('Requerido'),
  checked: yup.boolean(),
});
