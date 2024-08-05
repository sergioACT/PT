import * as yup from 'yup';

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required('Requerido'),
  newPassword: yup.string().required('Requerido'),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
    .required('Requerido'),
});
