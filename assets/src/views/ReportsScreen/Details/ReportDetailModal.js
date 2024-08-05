import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import {useToast} from 'react-native-toast-notifications';
import BasicButton from '../../../components/Button';
import Icons from '../../../components/Icons';

const ReportDetailModal = props => {
  const {handleClose, report} = props;
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

  const getTestState = state => {
    switch (state) {
      case 'finished':
        return 'Atendido';
      case 'unfinished':
        return 'No pudo ser atendido';
      case 'pending':
        return 'Pendiente';
      case 'active':
        return 'Activo';
      default:
        return 'Pendiente';
    }
  };

  return (
    <Container>
      <Row>
        <Subtitle>{report?.description}</Subtitle>
        <BasicButton isIcon={true} styleIcon={{padding: 3}} onPress={handleClose}>
          <Icons name="close" type="ant" size={25} />
        </BasicButton>
      </Row>
      <ContainerDescStatusEmpty>
        <TextStatEmpty>{report?.monitor?.state ? getTestState(report?.monitor?.state) : 'Pendiente'}</TextStatEmpty>
        <TextDescEmpty>{report?.monitor?.description || 'Sin descripción'}</TextDescEmpty>
      </ContainerDescStatusEmpty>
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

const ContainerDescStatusEmpty = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextStatEmpty = styled(Text)`
  font-size: 15px;
  font-weight: bold;
`;

const TextDescEmpty = styled(TextStatEmpty)`
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
`;

const Subtitle = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  flex: 1;
`;

export default ReportDetailModal;
