import React, {useContext} from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import {COLORS} from '../../../../assets/theme/colors';
import {ChangePasswordSchema} from './schema';
import BasicButton from '../../../../components/Button';
import FieldNameInput from '../../../../components/Input/FieldNameInput';
import {
  changePassword,
  checkIsLogged,
  reauthenticate,
  signIn,
} from './../../../../api/firebase/users';
import {useNavigation} from '@react-navigation/core';
import {Context} from '../../../../context';
import {useToast} from 'react-native-toast-notifications';

const FormChangePassword = () => {
  const navigation = useNavigation();
  const {userData, setGlobalLoading} = useContext(Context);
  const toast = useToast();

  const handleSubmit = values => {
    if (checkIsLogged()) {
      handleChangePass(values);
    } else {
      handleChangeAuthState(values);
    }
  };

  const handleChangeAuthState = values => {
    setGlobalLoading(true);
    signIn(userData.email, values.currentPassword)
      .then(() => {
        handleChangePass(values);
      })
      .catch(error => {
        setGlobalLoading(false);
        let title = '';
        let message = '';
        switch (error?.code) {
          case 'auth/wrong-password':
            title = 'Contraseña incorrecta';
            message = 'Por favor, vuelve a introducir tu contraseña';
            break;
          case 'auth/network-request-failed':
            title = 'Error de conexión';
            message = 'Revisa tu conexión a internet.';
            break;
          case 'auth/too-many-requests':
            title = 'Error al cambiar la contraseña';
            message = 'Ha ocurrido un error en tu conexión';
            break;
          default:
            title = 'Ha ocurrido un error';
            message = error.message;
            break;
        }
        Alert.alert(title, message, [
          {
            text: 'Aceptar',
          },
        ]);
      });
  };

  const handleChangePass = values => {
    changePassword(values.newPassword)
      .then(res2 => {
        setGlobalLoading(false);
        toast.show('Tu contraseña se cambió con éxito', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Contraseña cambiada',
          },
        });
        navigation.goBack();
      })
      .catch(error => {
        if (error.code == 'auth/requires-recent-login') {
          reauthenticate(values.currentPassword)
            .then(res => handleChangePass(values))
            .catch(error =>
              Alert.alert('Ha ocurrido un error', error.message, [
                {
                  text: 'Aceptar',
                },
              ]),
            );
          return;
        }
        setGlobalLoading(false);
        Alert.alert('Ha ocurrido un error', error.message, [
          {
            text: 'Aceptar',
          },
        ]);
      });
  };

  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      }}
      onSubmit={handleSubmit}
      validationSchema={ChangePasswordSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => {
        return (
          <LayoutContainer>
            <Container>
              <FieldNameInput
                fieldName="Contraseña actual"
                errors={errors}
                touched={touched}
                validateName="currentPassword"
                placeholder={'Tu contraseña actual'}
                values={values}
                onBlur={handleBlur('currentPassword')}
                onChangeText={handleChange('currentPassword')}
                autoCapitalize="none"
                secureTextEntry
              />
              <FieldNameInput
                fieldName="Nueva contraseña"
                errors={errors}
                touched={touched}
                validateName="newPassword"
                placeholder={'Tu nueva contraseña'}
                values={values}
                onBlur={handleBlur('newPassword')}
                onChangeText={handleChange('newPassword')}
                autoCapitalize="none"
                secureTextEntry
              />
              <FieldNameInput
                fieldName="Confirma tu nueva contraseña"
                errors={errors}
                touched={touched}
                validateName="newPasswordConfirm"
                placeholder={'Confirma tu nueva contraseña'}
                values={values}
                onBlur={handleBlur('newPasswordConfirm')}
                onChangeText={handleChange('newPasswordConfirm')}
                autoCapitalize="none"
                secureTextEntry
              />
            </Container>
            <UpdateButtonStyled
              text={'Actualizar contraseña'}
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

const FieldContainer = styled(View)`
  flex-direction: row;
`;

const UpdateButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

export default FormChangePassword;
