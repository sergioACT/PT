import React from 'react';
import {View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const CustomPicker = props => {
  const {items = [], placeholderText, onValueChange, ...rest} = props;

  return (
    <StyledView>
      <RNPickerSelect
        items={items}
        placeholder={{
          label: placeholderText,
          value: placeholderText,
        }}
        onValueChange={onValueChange}
        {...rest}
        useNativeAndroidPickerStyle={false}
      />
    </StyledView>
  );
};

const StyledView = styled(View)`
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: ${COLORS().white};
  border-radius: 3px;
  border-width: 1px;
  border-color: ${COLORS().grayInput};
  flex: 1;
  padding: 10px 15px;
`;

export default CustomPicker;
