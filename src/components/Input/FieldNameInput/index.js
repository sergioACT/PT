import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import BasicInput from '..';
import ErrorText from '../../ErrorText';
import FieldName from '../FieldName';

const FieldNameInput = props => {
  const {fieldName, errors, touched, validateName, placeholder, values, onBlur, onChangeText, autoCapitalize, showError, errorMessage, multiline, styleInput, icon, secureTextEntry, children, blurOnSubmit} = props;

  return (
    <View>
      <FieldContainer>
        <FieldName>{fieldName}</FieldName>
        {((errors[validateName] && touched[validateName]) || showError) && <ErrorText>{errors[validateName] || errorMessage}</ErrorText>}
      </FieldContainer>
      <Row>
        {children || (
          <Row>
            <BasicInput
              placeholder={placeholder}
              value={values[validateName]}
              onBlur={onBlur}
              onChangeText={onChangeText}
              autoCapitalize={autoCapitalize}
              style={styleInput}
              multiline={multiline}
              secureTextEntry={secureTextEntry}
              blurOnSubmit={blurOnSubmit}
            />
            {icon}
          </Row>
        )}
      </Row>
    </View>
  );
};

const FieldContainer = styled(View)`
  flex-direction: row;
`;

const Row = styled(FieldContainer)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default FieldNameInput;
