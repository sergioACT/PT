import React from 'react';
import { Image, Linking, View } from 'react-native';
import { Text } from 'react-native-paper';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Screen from '../../components/Screen';
import BasicButton from '../../components/Button';
import { COLORS } from '../../assets/theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from '../../components/Icons';
import PanicButton from '../../components/Button/PanicButton';
import { Context } from '../../context';

const ViolenciaFamiliarGeneroScreen = () => {

  const navigation = useNavigation();

  const { userData, setUserData, currentEmergency, setCurrentEmergency, setRealEmergency } = useContext(Context);

  const [hasActiveEmergency, setHasActiveEmeregency] = useState(userData?.hasEmergency);

  const handlePressEmergency = async () => {
    let newValue = !hasActiveEmergency;

    let emergency = {
      type: 'violenciaFamiliarGenero',
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
      <NavBar hasBackButton />
      <LayoutContainer>
        <Container>
          <InfoText>BOTÓN DE PÁNICO EXLUSIVO PARA</InfoText>
          <InfoText>VIOLENCIA FAMILIAR Y DE GÉNERO</InfoText>

          <ContainerPanicButton>
            <PanicButtonStyled backgroundColor={COLORS().orange} colorText={COLORS().white} onPress={handlePressEmergency} hasEmergency={hasActiveEmergency} />
          </ContainerPanicButton>
          <ImageStyled source={require('./../../assets/img/unidad_atencion_victimas.jpeg')} resizeMode="contain" />
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

const Row = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const InfoText = styled(Text)`
  font-size: 18px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: bold;
  color: orange;
`;

const InfoTextSmaller = styled(InfoText)`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const InfoOption = styled(Text)`
  font-size: 15px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
`;

const InfoOptionCTA = styled(InfoOption)`
  color: ${COLORS().purple};
  margin: 0 5px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

const ImageStyled = styled(Image)`
  width: 100%;
`;

const PanicButtonStyled = styled(PanicButton)`
  margin: 5px 0;
`;

export default ViolenciaFamiliarGeneroScreen;
