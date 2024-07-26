import React from 'react';

import {StyleSheet, TextInput, View} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const BasicInput = props => {
  const {value, placeholder, onChangeText, ...rest} = props;
  return <StyledInput value={value} placeholder={placeholder} onChangeText={onChangeText} {...rest} />;
};

const StyledInput = styled(TextInput)`
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: ${COLORS().white};
  border-radius: 3px;
  color: black;
  border-width: 1px;
  border-color: ${COLORS().grayInput};
  padding: 10px 15px;
  font-size: 14px;
  flex: 1;
`;

const defaultInputProps = {
  value: '',
  placeholder: '',
  onChangeText: () => {},
  rest: [],
};

BasicInput.defaultProps = defaultInputProps;

export default BasicInput;
