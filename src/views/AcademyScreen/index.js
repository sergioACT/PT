import React from 'react';
import {Image, Linking, View} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import Screen from '../../components/Screen';
import BasicButton from '../../components/Button';
import {COLORS} from '../../assets/theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icons from '../../components/Icons';

const AcademyScreen = () => {
  const handleCallNumber = number => Linking.openURL(`tel:${number}`);

  const handleWhatsapp = () => {
    let url = 'https://wa.me/528716765596';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data);
      })
      .catch(() => {});
  };

  return (
    <Screen scroll>
      <NavBar hasBackButton />
      <LayoutContainer>
        <ImageStyled source={{uri: 'https://i.imgur.com/wUY6jZV.png'}} resizeMode="stretch" />
        <Container>
          <InfoText>REQUISITOS</InfoText>
          <InfoOption>Edad: 19 a 39 años</InfoOption>
          <InfoOption>Escolaridad mínima: preparatoria</InfoOption>
          <InfoOption>Aprobar: examen físico y psicológico</InfoOption>
          <InfoOption> Estatura mínima: hombres 1.65m mujeres 1.55m</InfoOption>
          <InfoOption>Acta de nacimiento</InfoOption>
          <InfoOption>INE actualizado</InfoOption>
          <InfoOption>CURP</InfoOption>
          <InfoOption>RFC con homoclave</InfoOption>
          <InfoOption>Cartilla militar liberada</InfoOption>
          <InfoOption>Comprobante de domicilio (mes en curso)</InfoOption>
          <InfoOption>Carta de no antecedentes penales</InfoOption>
          <InfoOption>CV o solicitud de empleo</InfoOption>
          <InfoOption>Certificado de estudios</InfoOption>
          <InfoOption>Últimos dos recibos de nómina</InfoOption>
          <InfoOption>Carta de consulta de buro de crédito</InfoOption>
          <InfoTextSmaller>INFORMES: ACADEMIA DE POLICIA MUNICIPAL</InfoTextSmaller>
          <Row>
            <InfoOption>Tel: </InfoOption>
            <TouchableOpacity onPress={() => handleCallNumber('+528712961285')}>
              <InfoOptionCTA>871 296 1285</InfoOptionCTA>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleCallNumber('+528716765596')}>
              <InfoOptionCTA>871 676 5596</InfoOptionCTA>
            </TouchableOpacity>
          </Row>
          <Row>
            <InfoOption>Horario: 8:00 AM 5:00 PM</InfoOption>
          </Row>
          <ButtonStyled onPress={handleWhatsapp} text={'¡Quiero formar parte!'} backgroundColor={COLORS().purple} colorText={COLORS().white} renderIcon={() => <Icons name="whatsapp" color="white" type="fa" size={25} style={{marginLeft: 10}} />} />
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

export default AcademyScreen;
