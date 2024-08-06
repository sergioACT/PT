import React, {useRef} from 'react';
import {Dimensions, View, Text, Linking, LogBox} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';
import BasicButton from '../../components/Button';
import Icons from '../../components/Icons';
import ActionSheet from 'react-native-actionsheet';

LogBox.ignoreLogs(['Animated: `useNativeDriver`']);

const BottomSection = () => {
  const actionSheet = useRef(null);

  const handleWhatsapp = () => {
    let url = 'https://wa.me/5218719737975';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data);
      })
      .catch(() => {});
  };

  const handleFacebook = () => {
    let url = 'https://www.facebook.com/DSPMTORREON';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data);
      })
      .catch(() => {});
  };

  const handleTwitter = () => {
    let url = 'https://twitter.com/DSPMTorreon';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data);
      })
      .catch(() => {});
  };

  const handleOpenActionSheet = () => actionSheet.current.show();

  const handleCallEmergencies = i => {
    switch (i) {
      case 0:
        Linking.openURL(`tel:8717290099`);
        break;
      case 1:
        Linking.openURL(`tel:911`);
        break;
    }
  };

  return (
    <Row>
      <PoliceText>Policía de Torreón</PoliceText>
      <IconWrapper>
        <BasicButton backgroundColor="transparent" isIcon={true} onPress={handleOpenActionSheet} styleIcon={{padding: 5}}>
          <Icons name="phone" type="fa" size={30} color="black" />
        </BasicButton>
        <BasicButton backgroundColor="transparent" isIcon={true} onPress={handleWhatsapp} styleIcon={{padding: 5}}>
          <Icons name="whatsapp" type="fa" size={30} color="black" />
        </BasicButton>
        <BasicButton backgroundColor="transparent" isIcon={true} onPress={handleFacebook} styleIcon={{padding: 5}}>
          <Icons name="facebook" type="fa5" size={30} color="black" />
        </BasicButton>
        <BasicButton backgroundColor="transparent" isIcon={true} onPress={handleTwitter} styleIcon={{padding: 5}}>
          <Icons name="square-x-twitter" type="fa5" size={30} color="black" />
        </BasicButton>
        <ActionSheet useNativeDriver ref={actionSheet} title={'¿A quién quieres llamar?'} options={['Línea directa con la Policía', 'Llamada al 911', 'Cancelar']} cancelButtonIndex={2} onPress={handleCallEmergencies} />
      </IconWrapper>
    </Row>
  );
};

const OptionText = styled(Text)`
  color: ${COLORS().purple};
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
  flex: 1;
`;

const PoliceText = styled(OptionText)`
  font-size: 20px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  margin: 15px 0;
`;

const IconWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 40%;
`;

export default BottomSection;
