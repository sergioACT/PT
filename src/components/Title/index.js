import React from 'react';
import {Text} from 'react-native-paper';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {COLORS} from '../../assets/theme/colors';

const Title = ({children, fontSize, mayus = false}) => {
  return (
    <TitleComponent mayus={mayus} fontSize={fontSize}>
      {children}
    </TitleComponent>
  );
};

const TitleComponent = styled(Text)`
  width: 100%;
  color: ${COLORS().black};
  font-weight: bold;
  font-size: ${props => props.fontSize + 'px'};
  text-transform: ${props => (props.mayus ? 'uppercase' : 'none')};
`;

Title.defaultProps = {
  fontSize: 40,
};

Title.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  fontSize: PropTypes.number,
};

export default Title;
