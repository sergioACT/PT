import React, {Fragment} from 'react';
import {View, TouchableOpacity, Text, Platform} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const CheckBoxOriginal = require('@react-native-community/checkbox').default;

const CheckBox = props => {
  const {title, checked, onChange, mode, description} = props;
  return (
    <RowContainer>
      <TouchableOpacityStyled onPress={() => onChange()}>
        <CheckBoxContainer>
          <TappedContainer>
            <StyledCheckBox value={checked} boxType={mode} />
            <Option isAndroid={Platform.OS === 'android'}>{title}</Option>
          </TappedContainer>
        </CheckBoxContainer>
      </TouchableOpacityStyled>
      <DescriptionContainer>{description && <Description>{description}</Description>}</DescriptionContainer>
    </RowContainer>
  );
};

const TouchableOpacityStyled = styled(TouchableOpacity)`
  width: 100%;
  align-items: flex-start;
`;

const StyledCheckBox = styled(CheckBoxOriginal).attrs({
  lineWidth: 2,
  onAnimationType: 'fill',
  offAnimationType: 'fill',
  onFillColor: COLORS().black,
  tintColor: COLORS().black,
  onTintColor: COLORS().black,
  onCheckColor: COLORS().black,
  tintColors: COLORS().black,
  animationDuration: 0.2,
})`
  width: 10px;
  height: 10px;
  font-size: 11px;
`;

const Option = styled(Text)`
  font-weight: bold;
  padding-left: 10px;
  text-align: justify;
  color: black;
  margin-left: ${props => (props?.isAndroid ? '10px' : '0px')};
`;

const CheckBoxContainer = styled(View)`
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 5px;
  width: 100%;
`;

const RowContainer = styled(View)`
  width: 100%;
  align-items: flex-end;
`;

const TappedContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DescriptionContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-left: 25px;
`;

const Description = styled(Text)`
  text-align: justify;
`;

const defaultCheckBoxProps = {
  title: '',
  checked: false,
  onChange: () => {},
  mode: 'square',
};

CheckBox.defaultProps = defaultCheckBoxProps;

export default CheckBox;
