import * as yup from 'yup';

export const SignUpSchema = yup.object().shape({
  name: yup.string().trim().required('Requerido'),
  phone: yup.string().trim().required('Requerido'),
  streetNumber: yup.string().trim().required('Requerido'),
  neighborhood: yup.string().trim().required('Requerido'),
  zipcode: yup
    .string()
    .trim()
    .length(5, 'Código postal inválido')
    .required('Requerido'),
  email: yup.string().trim().email('Email inválido').required('Requerido'),
  password: yup.string().trim().required('Requerido'),
});

export const SignUpSchemaBusiness = yup.object().shape({
  name: yup.string().trim().required('Requerido'),
  phone: yup.string().trim().required('Requerido'),
  businessName: yup.string().trim().required('Requerido'),
  streetNumber: yup.string().trim().required('Requerido'),
  neighborhood: yup.string().trim().required('Requerido'),
  zipcode: yup
    .string()
    .trim()
    .length(5, 'Código postal inválido')
    .required('Requerido'),
  email: yup.string().trim().email('Email inválido').required('Requerido'),
  password: yup.string().trim().required('Requerido'),
});
