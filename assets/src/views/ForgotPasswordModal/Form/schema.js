import * as yup from 'yup';

export const ForgotPasswordSchema = yup.object().shape({
  email: yup.string().trim().email('Email inválido').required('Requerido'),
});
