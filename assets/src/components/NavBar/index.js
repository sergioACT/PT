import {StackActions, useNavigation} from '@react-navigation/core';
import React, {useContext, useState} from 'react';
import {View, Alert, TouchableWithoutFeedback} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';
import Icons from '../Icons';
import {logout, updateData} from '../../api/firebase/users';
import {Context} from '../../context';
import BottomPopup from '../BottomPopup';
import BasicButton from '../Button';
import {useToast} from 'react-native-toast-notifications';

const NavBar = props => {
  const {hasBackButton, hasProfileButton} = props;
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => setShowModal(false);

  const {setGlobalLoading, userData, handleLogout} = useContext(Context);

  const toast = useToast();

  const handleGoBack = () => navigation.goBack();

  const handleOpenModal = () => setShowModal(true);

  const handleLogoutLocal = deleteAccount => {
    logout()
      .then(() => {
        if (deleteAccount) {
          Alert.alert(
            'Confirmación de eliminar cuenta',
            '¿Estás seguro de que quieres eliminar tu cuenta?',
            [
              {
                style: 'destructive',
                text: 'Eliminar',
                onPress: () =>
                  updateData({isDeleted: true}, userData?.id)
                    .then(() => {
                      toast.show('Tu cuenta se ha eliminado', {
                        type: 'custom_toast',
                        animationDuration: 100,
                        data: {
                          title: 'Cuenta eliminada correctamente',
                        },
                      });
                      handleLogout();
                      navigation.dispatch(StackActions.replace('Login'));
                    })
                    .catch(error =>
                      Alert.alert('Ha ocurrido un error', error.message, [
                        {
                          text: 'Aceptar',
                        },
                      ]),
                    )
                    .finally(f => setGlobalLoading(false)),
              },
              {text: 'Cancelar', onPress: () => {}},
            ],
            {cancelable: false},
          );
        } else {
          handleLogout();
          navigation.dispatch(StackActions.replace('Login'));
        }
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

  const handleAction = async index => {
    switch (index) {
      case 0:
        navigation.navigate('UpdateDataScreen');
        break;
      case 1:
        navigation.navigate('ChangePasswordScreen');
        break;
      case 2:
        handleLogoutLocal(true);
        break;
      case 3:
        handleLogoutLocal();
        break;
    }
  };

  return (
    <LayoutContainer>
      {hasBackButton && (
        <WrapperLeft>
          <TouchableWithoutFeedback onPress={handleGoBack}>
            <WrapperLeft>
              <Icons type="entypo" name="chevron-left" size={20} />
              <ActionText>Regresar</ActionText>
            </WrapperLeft>
          </TouchableWithoutFeedback>
        </WrapperLeft>
      )}
      {hasProfileButton && (
        <WrapperRight>
          <TouchableWithoutFeedback onPress={handleOpenModal}>
            <WrapperRight>
              <ActionText>{userData?.name}</ActionText>
              <Icons type="entypo" name="chevron-down" size={20} />
            </WrapperRight>
          </TouchableWithoutFeedback>
        </WrapperRight>
      )}

      <BottomPopup isVisible={showModal} onTouchOutside={onCloseModal} title="¿Que podemos hacer por ti?">
        <Container>
          <TouchableWithoutFeedback onPress={() => handleAction(0)}>
            <View>
              <OptionText>Actualizar datos</OptionText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleAction(1)}>
            <View>
              <OptionText>Cambiar contraseña</OptionText>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => handleAction(2)}>
            <View>
              <OptionTextRed>Eliminar cuenta</OptionTextRed>
            </View>
          </TouchableWithoutFeedback>
          <SignoutButton text={'CERRAR SESIÓN'} onPress={() => handleAction(3)} backgroundColor={COLORS().red} colorText={COLORS().white} />
        </Container>
      </BottomPopup>
    </LayoutContainer>
  );
};

const LayoutContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  padding: 10px 20px;
  justify-content: flex-end;
  align-items: center;
  border-width: 1px;
  border-top-width: 0px;
  border-right-width: 0px;
  border-left-width: 0px;
  border-bottom-color: ${COLORS().grayInput};
`;

const Wrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const WrapperLeft = styled(Wrapper)`
  justify-content: flex-start;
`;

const WrapperRight = styled(Wrapper)`
  justify-content: flex-end;
`;

const ActionText = styled(Text)`
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
  color: black;
`;

const Container = styled(View)`
  margin: 10px 10px 0px 10px;
`;

const OptionText = styled(Text)`
  color: ${COLORS().purple};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;

const OptionTextRed = styled(OptionText)`
  color: ${COLORS().red};
`;

const SignoutButton = styled(BasicButton)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

NavBar.defaultProps = {
  hasBackButton: false,
  hasProfileButton: true,
};

export default NavBar;
