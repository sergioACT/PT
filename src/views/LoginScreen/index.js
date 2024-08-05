import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Dimensions, Image} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';
import CustomAlert from '../../components/CustomAlert';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import ForgotPasswordModal from '../ForgotPasswordModal';
import FormLogin from './Form';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

const LoginScreen = () => {
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);

  const handleSignUp = () => navigation.navigate('SignUpScreen');

  const handleCustomAlert = () => setShowAlert(!showAlert);

  const mainImage = require('./../../assets/img/mainImage.jpg');

  useEffect(() => {
    try {
      const resolvedImage = Image.resolveAssetSource(mainImage);
      console.log('Resolved Image URI:', resolvedImage?.uri);
    } catch (error) {
      console.error('Error resolving image source:', error);
    }
  }, []);

  return (
    <Screen scroll>
      <LayoutContainer>
        <ImageStyled source={mainImage} resizeMode="stretch" />
        <Container>
          <Title fontSize={25} mayus>
            Torreón Seguro
          </Title>
          <FormLogin />
          <TouchableWithoutFeedback onPress={handleSignUp}>
            <CTALabel>Registrar nuevo usuario</CTALabel>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleCustomAlert}>
            <CTALabel>¿Olvidaste tu contraseña?</CTALabel>
          </TouchableWithoutFeedback>
          <PrivacyContainer>
            <CTALabel>Aviso de privacidad</CTALabel>
          </PrivacyContainer>
        </Container>
      </LayoutContainer>
      <CustomAlert visibility={showAlert} handleClose={handleCustomAlert} height={220}>
        <ForgotPasswordModal handleClose={handleCustomAlert} />
      </CustomAlert>
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

const CTALabel = styled(Text)`
  color: ${COLORS().purple};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

const PrivacyContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;

const ImageStyled = styled(Image)`
  width: ${imageWidth}px;
  height: ${imageHeight}px;
`;

export default LoginScreen;
