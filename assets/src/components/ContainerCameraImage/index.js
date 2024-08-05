import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, Linking, PermissionsAndroid, Platform, TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components';
import {Text} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {COLORS} from '../../assets/theme/colors';
import Icons from '../Icons';
import ActionSheet from 'react-native-actionsheet';
import {checkMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

const ContainerCameraImage = props => {
  const {image, setImage} = props;
  const actionSheetCamera = useRef(null);

  useEffect(() => {
    const getAlert = (title, message, onPress = () => {}) =>
      Alert.alert(title, message, [
        {
          text: 'Aceptar',
          onPress,
        },
      ]);

    const permissionsStatuses = statuses => {
      console.log(statuses);
      return;
      const titleAlert = 'Error de persmiso en cámara';

      switch (result) {
        case RESULTS.UNAVAILABLE:
          getAlert(titleAlert, 'La característica de usar al cámara en este celular esta bloqueada.');
          break;
        case RESULTS.DENIED:
          getAlert(titleAlert, 'Debes aceptar los permisos para usar la cámara', async () => await Linking.openSettings());
          break;
        case RESULTS.LIMITED:
          getAlert(titleAlert, 'Los permisos estan limitados', async () => await Linking.openSettings());
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          getAlert(titleAlert, 'Debes aceptar los permisos para usar la cámara', async () => await Linking.openSettings());
          break;
      }
    };

    const getPermissions = async () => {
      let permissions = [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.MEDIA_LIBRARY, PERMISSIONS.ANDROID.PHOTO_LIBRARY];
      if (Platform.OS == 'ios') {
        permissions = [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY, PERMISSIONS.IOS.PHOTO_LIBRARY];
      }

      checkMultiple(permissions)
        .then(statuses => permissionsStatuses(statuses))
        .catch(error => {
          getAlert('Ha ocurrido un error', error.message);
        });
    };

    getPermissions();
  }, []);

  const handleImage = () => actionSheetCamera.current.show();

  const handleOpenCamera = async index => {
    const options = {
      title: 'Selecciona una imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      includeBase64: true,
    };
    switch (index) {
      case 0:
        options.title = 'Selecciona una imagen';

        await launchImageLibrary(options)
          .then(res => {
            setImage(res);
          })
          .catch(error => {
            Alert.alert('Ha ocurrido un error', error.message, [
              {
                text: 'Aceptar',
              },
            ]);
          });
        break;
      case 1:
        options.title = 'Tomar una fotografía';

        if (requestCameraPermission()) {
          await launchCamera(options)
            .then(res => {
              setImage(res);
            })
            .catch(error => {
              Alert.alert('Ha ocurrido un error', error.message, [
                {
                  text: 'Aceptar',
                },
              ]);
            });
        } else {
          Alert.alert('Ha ocurrido un error', error.message, [
            {
              text: 'Aceptar',
            },
          ]);
        }
        break;
      case 2:
        break;
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: 'Solicitud de permisos',
        message: 'La aplicación necesita acceso a la cámara',
        buttonNeutral: 'Preguntar más tarde',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Entendido',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      Alert.alert('Ha ocurrido un error', error.message, [
        {
          text: 'Aceptar',
        },
      ]);
    }
  };

  return (
    <ContainerImage>
      <TouchableWithoutFeedback onPress={handleImage}>
        <ImageView>
          {image?.assets?.length > 0 ? (
            <ImageContainer>
              <Image style={{height: '100%'}} source={{uri: image.assets[0].uri}} resizeMode="contain" />
            </ImageContainer>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Icons type="materialCommunity" name="image-plus" size={30} />
              <LabelImage>Agregar imagen</LabelImage>
            </View>
          )}
        </ImageView>
      </TouchableWithoutFeedback>
      <ActionSheet ref={actionSheetCamera} title={'¿Qué podemos hacer por ti?'} options={['Seleccionar de la galería', 'Tomar fotografía', 'Cancelar']} cancelButtonIndex={2} onPress={i => handleOpenCamera(i)} />
    </ContainerImage>
  );
};

const ContainerImage = styled(View)`
  padding: 3px;
  border-color: ${COLORS().grayInput};
  border-width: 1px;
  border-radius: 3px;
  height: 300px;
`;

const ImageView = styled(View)`
  background-color: #f7f8fa;
  justify-content: center;
  border-radius: 3px;
  flex: 1;
`;

const ImageContainer = styled(View)`
  margin: 2px;
`;

const LabelImage = styled(Text)`
  font-size: 14px;
  margin-top: 5px;
`;

export default ContainerCameraImage;
