import { useNavigation } from '@react-navigation/core';
import { onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, View, Text } from 'react-native';
import styled from 'styled-components';
import { collectionUserCurrentUser, updateData } from '../../api/firebase/users';
import { addEmergency, collectionEmergencies, updateEmergency } from '../../api/firebase/emergencies';
import { COLORS } from '../../assets/theme/colors';
import PanicButton from '../../components/Button/PanicButton';
import NavBar from '../../components/NavBar';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import { Context } from '../../context';
import BottomSection from './BottomSection';
import MenuSection from './MenuSection';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const HomeScreen = () => {
  const navigation = useNavigation();

  const { userData, setUserData, currentEmergency, setCurrentEmergency, setRealEmergency } = useContext(Context);

  const [hasActiveEmergency, setHasActiveEmeregency] = useState(userData?.hasEmergency);

  useEffect(() => {
    const unsubscribeEmergency = onSnapshot(collectionUserCurrentUser(userData.id), snapshot => {
      setHasActiveEmeregency(snapshot?.data()?.hasEmergency);

      if (snapshot?.data()?.hasEmergency) {
        setCurrentEmergency({ id: snapshot?.data()?.emergencyId });
      }
    });

    const unsubscribeEmergencies = onSnapshot(collectionEmergencies, snapshot => {
      let emergencies = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRealEmergency(emergencies.find(e => e.userId == userData.id));
    });

    return () => {
      unsubscribeEmergency();
      unsubscribeEmergencies();
    };
  }, []);

  useEffect(() => {
    if (hasActiveEmergency) {
      navigation.navigate('PanicScreen', {
        onDisableEmergency: handlePressEmergency,
        currentEmergency,
      });
    }
  }, [hasActiveEmergency]);

  const handlePressEmergency = async () => {
    let newValue = !hasActiveEmergency;

    let emergency = {
      type: 'default',
      status: 'pending',
      comments: '',
      unitNumber: 'Sin unidad asignada',
      creationDate: Date.now(),
      userId: userData.id,
    };

    if (newValue) {
      await addEmergency(emergency)
        .then(res => {
          emergency.id = res.id;
          setCurrentEmergency({ ...emergency });
        })
        .catch(error =>
          Alert.alert('Ha ocurrido un error al agregar la emergencia', error.message, [
            {
              text: 'Aceptar',
            },
          ]),
        );
    } else {
      updateEmergency({ closeDate: Date.now(), status: 'finishedByUser' }, currentEmergency?.id)
        .then(() => {
          emergency.id = currentEmergency?.id;
          setCurrentEmergency(null);
        })
        .catch(error =>
          Alert.alert('Ha ocurrido un error al desactivar la emergencia', error.message, [
            {
              text: 'Aceptar',
            },
          ]),
        );
    }

    updateData({ hasEmergency: newValue, emergencyId: newValue ? emergency.id : '' }, userData.id)
      .then(() => {
        setUserData({ ...userData, hasEmergency: newValue, emergencyId: newValue ? emergency.id : '' });
        setHasActiveEmeregency(newValue);
      })
      .catch(error =>
        Alert.alert('Ha ocurrido un error', error.message, [
          {
            text: 'Aceptar',
          },
        ]),
      );
  };

  return (
    <Screen scroll>
      <NavBar onPressUser />
      <LayoutContainer>
        <Container>
          <Title fontSize={25}>Bienvenido, {userData?.name}</Title>
          <MenuSection />
          <ContainerPanicButton>
            <PanicButtonStyled backgroundColor={COLORS().purple} colorText={COLORS().white} onPress={handlePressEmergency} hasEmergency={hasActiveEmergency} />
          </ContainerPanicButton>
        </Container>
        <ImageStyled source={require('./../../assets/img/mainImage.jpg')} resizeMode="contain" />
        <BottomSection />
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

const ContainerPanicButton = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const OptionText = styled(Text)`
  color: ${COLORS().purple};
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
  flex: 1;
`;

const PanicButtonStyled = styled(PanicButton)`
  margin: 5px 0;
`;

const ImageStyled = styled(Image)`
  width: ${imageWidth}px;
  height: ${imageHeight}px;
`;

export default HomeScreen;
