import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import NavBar from '../../../components/NavBar';
import Screen from '../../../components/Screen';
import FormNewReport from './Form';

const NewReportScreen = ({route}) => {
  const {onGoBack} = route.params;

  return (
    <Screen scroll>
      <NavBar hasBackButton />
      <LayoutContainer>
        <Container>
          <Name>Nuevo reporte</Name>
          <FormNewReport onGoBack={onGoBack} />
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

const Name = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  width: 100%;
`;

export default NewReportScreen;
