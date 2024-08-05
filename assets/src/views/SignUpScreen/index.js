import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import BasicButton from '../../components/Button';
import Icons from '../../components/Icons';
import Screen from '../../components/Screen';
import Title from '../../components/Title';
import FormSignUp from './Form';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => navigation.goBack();

  return (
    <Screen scroll>
      <LayoutContainer>
        <Container>
          <TopSection>
            <BasicButton
              backgroundColor="transparent"
              isIcon={true}
              styleIcon={{padding: 5}}
              onPress={handleGoBack}>
              <Icons name="chevron-thin-left" type="entypo" size={20} />
            </BasicButton>
            <Title fontSize={20}>Regresar</Title>
          </TopSection>
          <FormSignUp />
        </Container>
      </LayoutContainer>
    </Screen>
  );
};

const LayoutContainer = styled(View)`
  flex: 1;
  width: 100%;
`;

const TopSection = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const Container = styled(View)`
  flex: 1;
  width: 90%;
  align-self: center;
  margin: 20px 0 0 0;
`;

export default SignUpScreen;
