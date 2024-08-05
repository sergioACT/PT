import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Animated, {interpolateColor, useAnimatedStyle, useDerivedValue, withTiming} from 'react-native-reanimated';
import styled from 'styled-components';
import {COLORS} from '../../../assets/theme/colors';

const Colors = {
  purpleColor: {
    background: COLORS().orange,
    text: COLORS().white,
  },
  orangeColor: {
    background: COLORS().orange,
    text: COLORS().white,
  }
};

const PanicButton = props => {
  const {onPress, disabled, hasEmergency} = props;

  const [backgroundColor, setBackgroundColor] = useState('purpleColor');

  useEffect(() => {
    let timeout;
    if (hasEmergency) {
      timeout = setInterval(() => {
        setBackgroundColor(backgroundColor => (backgroundColor == 'purpleColor' ? 'orangeColor' : 'purpleColor'));
      }, 500);
    } else {
      clearInterval(timeout);
      setBackgroundColor('purpleColor');
    }
    return () => clearInterval(timeout);
  }, [hasEmergency]);

  const progress = useDerivedValue(() => {
    return withTiming(backgroundColor === 'purpleColor' ? 1 : 0);
  });

  const rStyle = useAnimatedStyle(() => {
    const backgroundColorS = interpolateColor(progress.value, [0, 1], [Colors.orangeColor.background, Colors.purpleColor.background]);

    return {
      backgroundColor: backgroundColorS,
    };
  });

  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Container style={[rStyle]}>
        <ButtonText>Botón de pánico</ButtonText>
      </Container>
    </TouchableOpacity>
  );
};

const Container = styled(Animated.View)`
  width: 150px;
  height: 150px;
  border-radius: 100px;
  padding: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: ${props => props?.colorText};
  font-size: 18px;
  color: ${COLORS().white};
  text-transform: uppercase;
  text-align: center;
`;

const PanicButtonProps = {
  onPress: () => {},
  text: '',
  style: {},
  disabled: false,
  colorText: COLORS().white,
  backgroundColor: COLORS().black,
  isIcon: false,
  styleIcon: {},
};

PanicButton.defaultProps = PanicButtonProps;

export default PanicButton;
