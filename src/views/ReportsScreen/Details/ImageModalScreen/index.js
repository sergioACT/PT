import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Dimensions, View, Image, Platform} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../../../assets/theme/colors';
import BasicButton from '../../../../components/Button';
import Icons from '../../../../components/Icons';
import Screen from '../../../../components/Screen';

const ImageModalScreen = props => {
  const {route} = props;
  const navigation = useNavigation();

  const handleClose = () => navigation.goBack();

  const renderImage = () => (
    <Container>
      <ContainerButton>
        <BasicButton
          isIcon={true}
          styleIcon={{padding: 3}}
          onPress={handleClose}>
          <Icons name="close" type="ant" size={40} color={COLORS().white} />
        </BasicButton>
      </ContainerButton>
      <ImageStyled resizeMode="contain" source={{uri: route?.params?.url}} />
    </Container>
  );

  if (Platform.OS == 'android') {
    return <Screen>{renderImage()}</Screen>;
  } else {
    return renderImage();
  }
};

const Container = styled(View)`
  flex: 1;
  background-color: ${COLORS().black};
`;

const ContainerButton = styled(View)`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const ImageStyled = styled(Image)`
  height: ${Dimensions.get('screen').height * 0.8}px;
  width: ${Dimensions.get('screen').width * 0.8}px;
  background-color: ${COLORS().black};
  position: absolute;
  left: 10%;
  top: 10%;
`;

export default ImageModalScreen;
