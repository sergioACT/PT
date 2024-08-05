import React from 'react';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import {COLORS} from '../../../assets/theme/colors';

const FieldName = ({children}) => {
  return <FieldNameStyled>{children}</FieldNameStyled>;
};

const FieldNameStyled = styled(Text)`
  font-weight: 500;
  width: 100%;
  color: ${COLORS().black};
  font-size: 15px;
  margin: 0;
  text-align: left;
  flex: 2;
`;

export default FieldName;
