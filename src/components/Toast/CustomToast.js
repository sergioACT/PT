import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const CustomToast = ({toast}) => {
  return (
    <Container>
      <StyledTitleText>{toast.data.title}</StyledTitleText>
      <StyledMessageText>{toast.message}</StyledMessageText>
    </Container>
  );
};

const Container = styled(View)`
  max-width: 85%;
  padding: 10px 15px;
  background-color: ${COLORS().white};
  margin: 4px 0;
  border-radius: 8px;
  border-left-color: #00c851;
  border-left-width: 6px;
  justify-content: center;
  padding-left: 16px;
`;

const StyledTitleText = styled(Text)`
  font-size: 14px;
  color: #333;
  font-weight: bold;
`;

const StyledMessageText = styled(Text)`
  color: #a3a3a3;
  margin-top: 2px;
`;

export default CustomToast;
