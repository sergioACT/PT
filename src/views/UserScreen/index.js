import {useNavigation} from '@react-navigation/core';
import React, {useContext} from 'react';
import {Alert, Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import {logout} from '../../api/firebase/users';
import {COLORS} from '../../assets/theme/colors';
import BasicButton from '../../components/Button';
import NavBar from '../../components/NavBar';
import Screen from '../../components/Screen';
import {Context} from '../../context';

const UserScreen = () => {
  const navigation = useNavigation();
  const {userData, setGlobalLoading, setUserData} = useContext(Context);

  const handleEditUser = () => navigation.navigate('UpdateDataScreen');

  const handleChangePassword = () =>
    navigation.navigate('ChangePasswordScreen');

  const handleLogout = () => {
    logout()
      .then(() => {
        setUserData({});
        navigation.navigate('Login');
      })
      .catch(err => {
        Alert.alert('Ha ocurrido un error', err.message, [
          {
            text: 'Aceptar',
          },
        ]);
      })
      .finally(f => setGlobalLoading(false));
  };

  return (
    <Screen>
      <NavBar hasBackButton hasProfileButton={false} />
      <LayoutContainer>
        <Container>
          <Name>{userData?.name}</Name>
          <ImageStyled source={{uri: 'https://i.imgur.com/DPiX4o8.png'}} />
          <ChangeButtonStyled
            text={'Actualizar datos'}
            onPress={handleEditUser}
            backgroundColor={COLORS().purple}
            colorText={COLORS().white}
          />
          <ChangeButtonStyled
            text={'Cambiar contraseña'}
            onPress={handleChangePassword}
            backgroundColor={COLORS().purple}
            colorText={COLORS().white}
          />
          <Row>
            <ButtonStyled
              text={'Llama al 911'}
              backgroundColor={COLORS().orange}
              colorText={COLORS().white}
            />
            <ButtonStyled
              text={'Cerrar sesión'}
              onPress={handleLogout}
              backgroundColor={COLORS().purple}
              colorText={COLORS().white}
            />
          </Row>
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
  text-align: center;
`;

const ChangeButtonStyled = styled(BasicButton)`
  margin: 5px 0;
`;

const ButtonStyled = styled(BasicButton)`
  margin: 5px 0;
  width: 48%;
`;

const ImageStyled = styled(Image)`
  height: 200px;
  width: 200px;
  align-self: center;
  margin: 20px 0;
`;

const Row = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export default UserScreen;
