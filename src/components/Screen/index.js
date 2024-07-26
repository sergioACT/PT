import React, {useState} from 'react';
import {
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  View,
} from 'react-native';
import styled from 'styled-components';
import {SafeAreaView} from 'react-native-safe-area-context';

import {COLORS} from './../../assets/theme/colors';

const Screen = props => {
  const {
    children,
    scroll,
    scrollBounces,
    behavior,
    widthContainer,
    backgroundColor,
  } = props;

  const renderScollView = () => {
    if (!scroll) {
      return <Container>{children}</Container>;
    }

    let scrollProps = {
      showsVerticalScrollIndicator: false,
      bounces: scrollBounces,
      keyboardShouldPersistTaps: 'handled',
      scrollEventThrottle: 32,
    };

    return (
      <ScrollViewStyled {...scrollProps}>
        <StatusBar translucent backgroundColor={`rgba(0,0,0,${1 * 0.4})`} />
        <Container width={widthContainer}>{children}</Container>
      </ScrollViewStyled>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor}}>
      <ComponentWrapper>
        <StyledKeyboardAvoidingView
          behavior={
            Platform.OS === 'ios' ? behavior || 'padding' : behavior || 'margin'
          }>
          {renderScollView()}
        </StyledKeyboardAvoidingView>
      </ComponentWrapper>
    </SafeAreaView>
  );
};

const ComponentWrapper = styled(View)`
  position: relative;
  background-color: ${COLORS().white};
  flex: 1;
`;

const StyledKeyboardAvoidingView = styled(KeyboardAvoidingView)`
  flex: 1;
`;

const ScrollViewStyled = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

const Container = styled(View)`
  flex: 1;
  ${props => (props?.width ? `width:${props?.width};align-self: center;` : '')};
`;

const defaultScreenProps = {
  hasBackgroundPattern: true,
  children: null,
  scroll: false,
  scrollBounces: false,
  behavior: '',
  keyboardShouldPersistTaps: 'handled',
  initialRoute: false,
  backgroundColor: '',
  tabs: false,
  backgroundColor: COLORS().white,
};

Screen.defaultProps = defaultScreenProps;

export default Screen;
