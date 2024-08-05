import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import FormForgotPassword from './Form';
import Icons from './../../components/Icons';
import BasicButton from '../../components/Button';
import {forgotPassword} from '../../api/firebase/users';
import {useToast} from 'react-native-toast-notifications';

const ForgotPasswordModal = props => {
  const {handleClose} = props;
  const toast = useToast();

  const handleForgotPassword = values => {
    forgotPassword(values.email)
      .then(res => {
        toast.show('Se envió un correo para realizar tu cambio de contraseña', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Correo enviado de cambio de contraseña',
          },
        });
        handleClose();
      })
      .catch(err => {
        Alert.alert('Ha ocurrido un error', err.message, [
          {
            text: 'Aceptar',
          },
        ]);
      });
  };

  return (
    <Container>
      <Row>
        <Subtitle>Olvide mi contraseña</Subtitle>
        <BasicButton
          isIcon={true}
          styleIcon={{padding: 3}}
          onPress={handleClose}>
          <Icons name="close" type="ant" size={25} />
        </BasicButton>
      </Row>
      <FormForgotPassword onSubmit={handleForgotPassword} />
    </Container>
  );
};

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Container = styled(View)`
  flex: 1;
  width: 90%;
  align-self: center;
  margin: 20px 0;
`;

const Subtitle = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  flex: 1;
`;

export default ForgotPasswordModal;
