import React, {useContext} from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components';
import {Formik} from 'formik';
import {COLORS} from '../../../assets/theme/colors';
import {LoginSchema} from './schema';
import BasicButton from '../../../components/Button';
import FieldNameInput from '../../../components/Input/FieldNameInput';
import {Context} from '../../../context';
import {getUser, getUserWithNumber, sendEmailV, signIn, verifyIsVerified} from '../../../api/firebase/users';
import {useNavigation, StackActions} from '@react-navigation/core';
import CheckBox from '../../../components/Checkbox';
import {useToast} from 'react-native-toast-notifications';

const FormLogin = () => {
  const navigation = useNavigation();

  const {setGlobalLoading, saveUserData} = useContext(Context);

  const toast = useToast();

  const validateEmail = email => {
    return String(email)
      .toLowerCase()
      .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleError = err => {
    setGlobalLoading(false);
    let title = '';
    let message = '';
    switch (err?.code) {
      case 'auth/wrong-password':
        title = 'Contraseña incorrecta';
        message = 'Por favor, vuelve a introducir tu contraseña';
        break;
      case 'auth/user-not-found':
        title = 'Usuario no encontrado';
        message = 'Por favor, vuelve a introducir tu contraseña';
        break;
      case 'auth/network-request-failed':
        title = 'Error de conexión';
        message = 'Revisa tu conexión a internet.';
        break;
      default:
        title = 'Ha ocurrido un error';
        message = err.message;
        break;
    }

    Alert.alert(title, message, [
      {
        text: 'Aceptar',
      },
    ]);
  };

  const handleSignWithEmail = values => {
    setGlobalLoading(true);
    signIn(values.emailNumber, values.password)
      .then(userCredentials => {
        if (verifyIsVerified()) {
          getUser(userCredentials.user.uid)
            .then(user => {
              if (user.docs.length > 0) {
                if (user.docs[0].data()?.isDeleted) {
                  toast.show('Tu cuenta ha sido eliminada por el usuario', {
                    type: 'error',
                    animationDuration: 100,
                    data: {
                      title: 'Cuenta eliminada',
                    },
                  });
                  return;
                }
                saveUserData(
                  {
                    id: user.docs[0].id,
                    ...user.docs[0].data(),
                  },
                  values.checked,
                );
                navigation.dispatch(StackActions.replace('Home'));
              }
            })
            .finally(f => setGlobalLoading(false));
        } else {
          sendEmailV();
          toast.show('Tu email no esta verificado, se mando un correo para que puedas verificarlo.', {
            type: 'error',
            animationDuration: 100,
            data: {
              title: 'Email no verificado',
            },
          });
        }
      })
      .catch(handleError)
      .finally(() => setGlobalLoading(false));
  };

  const handleSignIn = values => {
    if (validateEmail(values.emailNumber)) {
      handleSignWithEmail(values);
    } else if (values.emailNumber.length > 9) {
      setGlobalLoading(true);
      getUserWithNumber(values.emailNumber)
        .then(user => {
          if (user.docs.length > 0) {
            const currentUser = {
              id: user.docs[0].id,
              ...user.docs[0].data(),
            };

            signIn(currentUser.email, values.password)
              .then(userCredentials => {
                if (verifyIsVerified()) {
                  if (userCredentials.user.uid) {
                    saveUserData(
                      {
                        id: user.docs[0].id,
                        ...user.docs[0].data(),
                      },
                      values.checked,
                    );
                    navigation.dispatch(StackActions.replace('Home'));
                  }
                } else {
                  sendEmailV();
                  toast.show('Tu email no esta verificado, se mando un correo para que puedas verificarlo.', {
                    type: 'error',
                    animationDuration: 100,
                    data: {
                      title: 'Email no verificado',
                    },
                  });
                }
              })
              .catch(handleError);
          }
        })
        .finally(f => setGlobalLoading(false));
    } else {
      Alert.alert('Error', 'Tu usuario es incorrecto, por favor ingresa un email o número de celular correcto', [
        {
          text: 'Aceptar',
        },
      ]);
    }
  };

  return (
    <Formik
      initialValues={{
        emailNumber: '',
        password: '',
        checked: false,
      }}
      onSubmit={handleSignIn}
      validationSchema={LoginSchema}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors, setFieldValue}) => {
        return (
          <Container>
            <FieldNameInput
              fieldName="Email o Número De Teléfono"
              errors={errors}
              touched={touched}
              validateName="emailNumber"
              placeholder={'Email o Número De Teléfono'}
              values={values}
              onBlur={handleBlur('emailNumber')}
              onChangeText={handleChange('emailNumber')}
              autoCapitalize="none"
            />
            <FieldNameInput
              fieldName="Contraseña"
              errors={errors}
              touched={touched}
              validateName="password"
              placeholder={'Contraseña'}
              values={values}
              secureTextEntry
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
              autoCapitalize="none"
            />
            <Row>
              <CheckBox title="Mantener sesión iniciada" checked={values.checked} onChange={() => setFieldValue('checked', !values.checked)} />
            </Row>

            <LoginButtonStyled text={'Iniciar sesión'} onPress={handleSubmit} backgroundColor={COLORS().purple} colorText={COLORS().white} />
          </Container>
        );
      }}
    </Formik>
  );
};

const Container = styled(View)`
  margin-top: 20px;
`;

const LoginButtonStyled = styled(BasicButton)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Row = styled(View)`
  align-items: flex-end;
`;

export default FormLogin;
