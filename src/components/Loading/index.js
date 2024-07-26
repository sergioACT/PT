import React, {Fragment, useContext, useState} from 'react';
import {Animated, Easing} from 'react-native';
import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';
import AnimatedLottieView from 'lottie-react-native';
import LoadingLottie from './../../assets/lotties/LoadingLottie.json';
import {fadeIn} from '../../utils/animations/loading';
import {Context} from '../../context';

const scaleInSpinner = {
  from: {
    scale: 0,
    opacity: 0,
  },
  to: {
    scale: 1,
    opacity: 1,
  },
};

const scaleOutSpinner = {
  from: {
    scale: 1,
    opacity: 1,
  },
  to: {
    scale: 0,
    opacity: 0,
  },
};

const fadeInBackground = {
  from: {
    opacity: 1,
  },
  to: {
    opacity: 0.8,
  },
};

const fadeOutBackground = {
  from: {
    opacity: 0.8,
  },
  to: {
    opacity: 1,
  },
};

const Loading = () => {
  const {globalLoading, loadingMessage} = useContext(Context);

  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  if (!globalLoading) {
    return <Fragment />;
  }

  return (
    <Wrapper opacity={1}>
      <StyledLoading
        pointerEvents={globalLoading ? 'auto' : 'none'}
        duration={333}
        animation={globalLoading ? fadeInBackground : fadeOutBackground}
        easing={Easing.bezier(0.4, 0.0, 0.2, 1)}
        useNativeDriver
      />
      <StyledSpinner
        pointerEvents={globalLoading ? 'auto' : 'none'}
        duration={333}
        animation={globalLoading ? scaleInSpinner : scaleOutSpinner}
        easing={Easing.bezier(0.4, 0.0, 0.2, 1)}
        useNativeDriver>
        <AnimatedLottieViewStyled source={LoadingLottie} autoPlay loop />
      </StyledSpinner>
      {loadingMessage ? (
        <StyledMessage animation={fadeIn}>{loadingMessage}</StyledMessage>
      ) : null}
    </Wrapper>
  );
};

const StyledLoading = styled(Animatable.View)`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledSpinner = styled(Animatable.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(Animated.View)`
  opacity: ${props => props?.opacity};
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledMessage = styled(Animatable.Text)`
  position: relative;
  font-size: 18px;
  font-weight: bold;
  top: 85px;
`;

const AnimatedLottieViewStyled = styled(AnimatedLottieView)`
  width: 200px;
`;

export default Loading;
