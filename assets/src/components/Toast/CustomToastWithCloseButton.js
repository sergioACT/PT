import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const CustomToastWithCloseButton = ({toast}) => {
  return (
    <Container>
      <StyledMessageText>{toast.message}</StyledMessageText>
      <StyledClosePress onPress={() => toast.onHide()}>
        <Text style={{}}>x</Text>
      </StyledClosePress>
    </Container>
  );
};

const Container = styled(View)`
  max-width: 85%;
  padding: 10px 0px;
  background-color: ${COLORS().white};
  margin: 4px 0;
  border-radius: 8px;
  border-left-color: #00c851;
  border-left-width: 6px;
  justify-content: center;
  padding-left: 16px;
  flex-direction: row;
`;

const StyledMessageText = styled(Text)`
  color: #a3a3a3;
  margin-right: 16px;
`;

const StyledClosePress = styled(TouchableOpacity)`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-left: auto;
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background-color: #333;
  justify-content: 'center';
  align-items: 'center';
`;

const StyledIcon = styled(Text)`
  color: ${COLORS().white};
  font-weight: 500;
  margin-bottom: 2.5px;
`;

export default CustomToastWithCloseButton;
