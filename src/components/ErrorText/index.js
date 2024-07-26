import React from 'react';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const ErrorText = ({children, numberOfLines, style}) => {
  return (
    <ErrorTexStyled style={style} numberOfLines={numberOfLines}>
      {children}
    </ErrorTexStyled>
  );
};

const ErrorTexStyled = styled(Text)`
  font-size: 13px;
  text-align: right;
  color: ${COLORS().errorText};
  word-wrap: break-word;
  flex: 1;
`;

const defaultErrorTexProps = {
  children: null,
  numberOfLines: 1,
  style: null,
};

ErrorText.defaultProps = defaultErrorTexProps;

export default ErrorText;
