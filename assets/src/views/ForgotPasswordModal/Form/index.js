import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import {COLORS} from '../../../assets/theme/colors';
import {ForgotPasswordSchema} from './schema';
import BasicButton from '../../../components/Button';
import FieldNameInput from '../../../components/Input/FieldNameInput';

const FormForgotPassword = ({onSubmit}) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={onSubmit}
      validationSchema={ForgotPasswordSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => {
        return (
          <Container>
            <FieldNameInput
              fieldName="Email"
              errors={errors}
              touched={touched}
              validateName="email"
              placeholder={'Email'}
              values={values}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
              autoCapitalize="none"
            />
            <ForgotPasswordButtonStyled
              text={'Confirmar'}
              onPress={handleSubmit}
              backgroundColor={COLORS().purple}
              colorText={COLORS().white}
            />
          </Container>
        );
      }}
    </Formik>
  );
};

const Container = styled(View)`
  margin-top: 20px;
`;

const ForgotPasswordButtonStyled = styled(BasicButton)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

export default FormForgotPassword;
