import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';

import NavBar from '../../../components/NavBar';
import Screen from '../../../components/Screen';
import FormUpdateData from './Form';

const ChangePasswordScreen = () => {
  return (
    <Screen>
      <NavBar hasBackButton hasProfileButton={false} />
      <LayoutContainer>
        <Container>
          <Subtitle>Cambia tu contraseña</Subtitle>
          <FormUpdateData />
        </Container>
      </LayoutContainer>
    </Screen>
  );
};

const LayoutContainer = styled(View)`
  flex: 1;
  width: 100%;
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
  width: 100%;
  margin-bottom: 10px;
`;

export default ChangePasswordScreen;
