import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import BasicButton from '../../../../components/Button';
import Icons from '../../../../components/Icons';
import FormRelogin from '../ReloginModal/Form';

const ReloginModal = props => {
  const {handleClose} = props;

  return (
    <Container>
      <Row>
        <Subtitle>Ingresa tu contraseña para confirmar</Subtitle>
        <BasicButton
          isIcon={true}
          styleIcon={{padding: 3}}
          onPress={handleClose}>
          <Icons name="close" type="ant" size={25} />
        </BasicButton>
      </Row>
      <FormRelogin setShowAlert={handleClose} />
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
  font-size: 20px;
  font-weight: bold;
  flex: 1;
`;

export default ReloginModal;
