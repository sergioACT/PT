import * as yup from 'yup';

export const SuggestionMailboxSchema = yup.object().shape({
  complaint: yup.string().trim().required('Requerido'),
  message: yup.string().trim().required('Requerido'),
});
