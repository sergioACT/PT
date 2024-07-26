import {useNavigation} from '@react-navigation/core';
import {onSnapshot} from 'firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components';
import _ from 'lodash';
import {collectionUserCurrentUser, updateData} from '../../api/firebase/users';
import {COLORS} from '../../assets/theme/colors';
import Icons from '../../components/Icons';
import Screen from '../../components/Screen';
import {Context} from '../../context';
import Geocode from 'react-geocode';
import {collectionEmergencies, updateEmergency} from '../../api/firebase/emergencies';
import useGeolocation from './../../hooks/useGeolocation';
import Geolocation from '@react-native-community/geolocation';

const PanicScreen = props => {
  const {route} = props;
  const navigation = useNavigation();
  const {
    userData: {id, emergencyId},
  } = useContext(Context);

  const geolocation = useGeolocation({enableHighAccuracy: true, timeout: 2000, maximumAge: 0}, true);

  const handleClose = () => {
    route?.params?.onDisableEmergency();
  };

  const [lastLivePosition, setLastLivePosition] = useState(null);
  const [currentEmergencies, setCurrentEmergencies] = useState([]);
  const [currentEmergency, setCurrentEmergency] = useState(null);

  const getCoords = info => ({
    latitude: info.coords.latitude,
    longitude: info.coords.longitude,
  });

  useEffect(() => {
    const unsubscribeEmergency = onSnapshot(collectionUserCurrentUser(id), async snapshot => {
      if (!snapshot?.data()?.hasEmergency) {
        navigation.goBack();
      }

      if (snapshot?.data()?.requestingLocation?.requestingApp) {
        let newDataRequestingLocation = {requestingLocation: {location: {}, requestingApp: false, requestingWeb: true}};
        let coords = {};
        await Geolocation.getCurrentPosition(async info => {
          coords = getCoords(info);

          newDataRequestingLocation.requestingLocation.location.coords = coords;
          newDataRequestingLocation.requestingLocation.location.updateDate = Date.now();

          await Geocode.fromLatLng(coords.latitude, coords.longitude).then(
            response => {
              newDataRequestingLocation.requestingLocation.location.address = response.results[0].formatted_address;

              updateData(newDataRequestingLocation, id)
                .then(() => {})
                .catch(error =>
                  Alert.alert('Ha ocurrido un error', error.message, [
                    {
                      text: 'Aceptar',
                    },
                  ]),
                );

              updateEmergency({location: newDataRequestingLocation.requestingLocation?.location}, route?.params?.currentEmergency?.id)
                .then(() => {})
                .catch(console.log);
            },
            error => {
              console.error(error);
            },
          );
        });
      }
    });

    const unsubscribeEmergencies = onSnapshot(collectionEmergencies, snapshot => {
      setCurrentEmergencies(
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })),
      );
    });

    return () => {
      unsubscribeEmergency();
      unsubscribeEmergencies();
    };
  }, []);

  useEffect(() => {
    if (emergencyId !== '') {
      setCurrentEmergency(currentEmergencies.find(e => e.id == emergencyId));
    }
  }, [emergencyId, currentEmergencies]);

  useEffect(() => {
    updateLocation();
  }, [geolocation]);

  const updateLocation = async () => {
    if (lastLivePosition == null) {
      setLastLivePosition(geolocation);
    }

    if (lastLivePosition?.latitude !== geolocation?.latitude && lastLivePosition?.longitude !== geolocation?.longitude) {
      setLastLivePosition({...geolocation});

      let location = {
        address: '',
        coords: {
          latitude: geolocation.latitude,
          longitude: geolocation.longitude,
        },
        updateDate: Date.now(),
      };

      await Geocode.fromLatLng(geolocation.latitude?.toString(), geolocation.longitude?.toString()).then(
        response => {
          location.address = response.results[0].formatted_address;
        },
        error => {
          console.error(1, error);
        },
      );

      updateEmergency({location}, route?.params?.currentEmergency?.id)
        .then(() => {})
        .catch(console.log);
    }
  };

  return (
    <Screen backgroundColor={COLORS().red}>
      <LayoutContainer>
        <Container>
          <Row>
            <TouchableWithoutFeedback onPress={handleClose}>
              <WrapperDisable>
                <DisabledText>Desactivar</DisabledText>
                <Icons name="close" type="ant" size={25} color={COLORS().white} />
              </WrapperDisable>
            </TouchableWithoutFeedback>
          </Row>
          <TextWrapper>
            <TitleStyled>ALERTA DE PÁNICO ACTIVADA</TitleStyled>
            <DescriptionStyled>Conserva la calma, una unidad va en camino.</DescriptionStyled>
            {currentEmergency?.unitNumber != 'Sin unidad asignada' ? (
              <View>
                <UnitTextStyled>UNIDAD</UnitTextStyled>
                <UnitDetailStyled>{currentEmergency?.unitNumber}</UnitDetailStyled>
              </View>
            ) : (
              <View>
                <UnitTextStyled>{currentEmergency?.unitNumber}</UnitTextStyled>
              </View>
            )}
          </TextWrapper>
        </Container>
      </LayoutContainer>
    </Screen>
  );
};

const LayoutContainer = styled(View)`
  flex: 1;
  width: 100%;
  background-color: ${COLORS().red};
`;

const Container = styled(View)`
  flex: 1;
  width: 90%;
  align-self: center;
  margin: 20px 0;
`;

const Row = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const WrapperDisable = styled(View)`
  flex-direction: row;
  padding: 0px 5px 20px 20px;
`;

const DisabledText = styled(Text)`
  color: ${COLORS().white};
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
`;

const TextWrapper = styled(View)`
  flex: 1;
  width: 100%;
  align-self: center;
  justify-content: center;
`;

const TitleStyled = styled(DisabledText)`
  font-size: 35px;
  text-align: center;
`;

const UnitTextStyled = styled(TitleStyled)`
  margin-top: 20px;
`;

const UnitDetailStyled = styled(TitleStyled)``;

const DescriptionStyled = styled(DisabledText)`
  text-align: center;
  font-weight: 500;
  margin-top: 15px;

  padding: 0px 20px;
`;

export default PanicScreen;
