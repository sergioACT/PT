import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import NavBar from '../../../components/NavBar';
import Screen from '../../../components/Screen';
import FormUpdateData from './Form';
import CustomAlert from './../../../components/CustomAlert';
import ReloginModal from './ReloginModal';

const UpdateDataScreen = () => {
  const [showAlert, setShowAlert] = useState(false);

  const handleCustomAlert = () => setShowAlert(!showAlert);

  return (
    <Screen>
      <NavBar hasBackButton hasProfileButton={false} />
      <LayoutContainer>
        <Container>
          <Subtitle>Actualiza tus datos</Subtitle>
          <FormUpdateData setShowAlert={setShowAlert} />
        </Container>

        <CustomAlert
          visibility={showAlert}
          handleClose={handleCustomAlert}
          height={220}>
          <ReloginModal handleClose={handleCustomAlert} />
        </CustomAlert>
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

export default UpdateDataScreen;
