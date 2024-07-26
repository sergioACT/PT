import React, {useContext, useState} from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import {ReloginSchema} from './schema';
import BasicButton from '../../../../../components/Button';
import FieldNameInput from './../../../../../components/Input/FieldNameInput';
import {COLORS} from '../../../../../assets/theme/colors';
import {Context} from '../../../../../context';
import {updateData, updateEmailUser} from '../../../../../api/firebase/users';

const FormRelogin = ({setShowAlert}) => {
  const {userData, setGlobalLoading, setUserData, setNewValues, newValues} =
    useContext(Context);
  const {emailDoc} = userData;
  const {email} = newValues;

  const handleChangeEmail = values => {
    setGlobalLoading(true);
    updateEmailUser(email, values.password)
      .then(res => {
        setShowAlert(false);
        updateData({email: newValues.email}, emailDoc)
          .then(() => {
            setUserData({...userData, ...newValues});
            setNewValues({});
          })
          .catch(error =>
            Alert.alert('Ha ocurrido un error', error.message, [
              {
                text: 'Aceptar',
              },
            ]),
          );
      })
      .catch(error => {
        if (error.code == 'auth/requires-recent-login') {
          reauthenticate();
        }
      })
      .finally(f => setGlobalLoading(false));
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        password: '',
      }}
      onSubmit={handleChangeEmail}
      validationSchema={ReloginSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => {
        return (
          <LayoutContainer>
            <Container>
              <FieldNameInput
                fieldName="Ingresa tu contraseña"
                errors={errors}
                touched={touched}
                validateName="password"
                placeholder="Tu contraseña"
                values={values}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                autoCapitalize="none"
                secureTextEntry
              />
            </Container>
            <LoginButtonStyled
              text={'Confirmar'}
              onPress={handleSubmit}
              backgroundColor={COLORS().purple}
              colorText={COLORS().white}
            />
          </LayoutContainer>
        );
      }}
    </Formik>
  );
};

const LayoutContainer = styled(View)`
  flex: 1;
`;

const Container = styled(View)`
  flex: 1;
`;

const LoginButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

export default FormRelogin;
