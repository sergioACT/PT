import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const BasicButton = props => {
  const {onPress, text, style, disabled, colorText, backgroundColor, isIcon, children, styleIcon, renderIcon = () => null} = props;

  const handlePress = () => {
    if (disabled) {
      return;
    }
    onPress();
  };

  if (isIcon) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styleIcon}>{children}</View>
      </TouchableOpacity>
    );
  }
  return (
    <View style={style}>
      <TouchableOpacity onPress={handlePress}>
        <ButtonStyled
          disabled={disabled}
          backgroundColor={backgroundColor}
          labelStyle={{
            fontSize: 18,
          }}>
          <ButtonText colorText={colorText || COLORS().blackIntensive}>{text}</ButtonText>
          {renderIcon()}
        </ButtonStyled>
      </TouchableOpacity>
    </View>
  );
};

const ButtonStyled = styled(View)`
  background-color: ${props => (props?.disabled ? COLORS().disabledColor : props?.backgroundColor || COLORS().purple)};
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  height: 50px;
  flex-direction: row;
`;

const ButtonText = styled(Text)`
  color: ${props => props?.colorText};
  font-size: 18px;
`;

const defaultBasicButtonProps = {
  onPress: () => {},
  text: '',
  style: {},
  disabled: false,
  colorText: COLORS().white,
  backgroundColor: COLORS().black,
  isIcon: false,
  styleIcon: {},
};

BasicButton.defaultProps = defaultBasicButtonProps;

export default BasicButton;
