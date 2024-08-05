import React, {useContext, useRef, useState} from 'react';
import {Alert, TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components';
import Geocode from 'react-geocode';
import ActionSheet from 'react-native-actionsheet';
import Geolocation from '@react-native-community/geolocation';
import {useNavigation} from '@react-navigation/core';
import FieldNameInput from '../Input/FieldNameInput';
import Icons from '../Icons';
import {Context} from '../../context';

const FieldMap = props => {
  const {errors, touched, values, handleBlur, handleChange} = props;
  const navigation = useNavigation();
  const {setGlobalLoading} = useContext(Context);

  const actionSheet = useRef(null);

  const [origin, setOrigin] = useState({});
  const [address, setAddress] = useState('');

  const handleLocation = () => actionSheet.current.show();

  const handleAddress = (coords, values) => {
    setOrigin(coords);
    getAddress(coords, values);
  };

  const getCoords = info => ({
    latitude: info.coords.latitude,
    longitude: info.coords.longitude,
  });

  const handleNAvigateToMapView = values => {
    if (values.address && values.address != '') {
      //Validate address
      Geocode.fromAddress(values.address).then(
        response => {
          const {lat, lng} = response.results[0].geometry.location;
          navigation.navigate('MapViewScreen', {
            currentLocation: {
              latitude: lat,
              longitude: lng,
            },
            saveLocation: region => {
              handleAddress(region, values);
            },
          });
        },
        error => {
          Alert.alert(
            'Dirección incorrecta',
            'Favor de ingresar una dirección válida',
            [
              {
                text: 'Aceptar',
              },
            ],
          );
        },
      );
    } else {
      Geolocation.getCurrentPosition(info => {
        navigation.navigate('MapViewScreen', {
          currentLocation: getCoords(info),
          saveLocation: region => {
            handleAddress(region, values);
          },
        });
      });
    }
  };

  const handleNavigateTo = (index, values) => {
    switch (index) {
      case 0:
        Geolocation.getCurrentPosition(info => {
          handleAddress(getCoords(info), values);
        });
        break;
      case 1:
        handleNAvigateToMapView(values);
        break;
      case 2:
        break;
    }
    return;
  };

  const getAddress = (coords, values) => {
    setGlobalLoading(true);
    Geocode.fromLatLng(coords.latitude, coords.longitude)
      .then(
        response => {
          setAddress(response.results[0].formatted_address);
          values.address = response.results[0].formatted_address;
        },
        error => {
          console.error(error);
        },
      )
      .finally(f => setGlobalLoading(false));
  };

  return (
    <>
      <FieldNameInput
        fieldName="Dirección"
        errors={errors}
        touched={touched}
        validateName="address"
        placeholder={'Escriba la dirección o seleccione en el mapa'}
        onBlur={handleBlur('address')}
        onChangeText={handleChange('address')}
        values={values}
        icon={
          <TouchableWithoutFeedback onPress={handleLocation}>
            <IconWrapper>
              <Icons name="location-pin" type="entypo" size={30} />
            </IconWrapper>
          </TouchableWithoutFeedback>
        }
      />
      <ActionSheet
        ref={actionSheet}
        title={'¿Qué podemos hacer por ti?'}
        options={[
          'Usar ubicación actual',
          'Seleccionar en el mapa',
          'Cancelar',
        ]}
        cancelButtonIndex={2}
        onPress={i => handleNavigateTo(i, values)}
      />
    </>
  );
};

const IconWrapper = styled(View)`
  padding: 3px;
`;

export default FieldMap;
