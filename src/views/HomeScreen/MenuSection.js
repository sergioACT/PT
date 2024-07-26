import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import styled from 'styled-components';
import { COLORS } from '../../assets/theme/colors';
import Icons from '../../components/Icons';

const MenuSection = () => {
  const navigation = useNavigation();

  const optionsMenu = [
    {
      id: 1,
      title: 'Módulo de reporte',
      action: () => navigation.navigate('ReportsScreen'),
      icon: <Icons name="report" type="material" size={20} color={COLORS().purple} />,
      color: COLORS().purple,
    },
    // {
    //   id: 2,
    //   title: 'Módulo de academia',
    //   action: () => navigation.navigate('AcademyScreen'),
    //   icon: <Icons name="school" type="ionicon" size={20} color={COLORS().} />,
    // },
    {
      id: 3,
      title: 'Buzón de sugerencias',
      action: () => navigation.navigate('SuggestionMailBoxScreen'),
      icon: <Icons name="mail" type="entypo" size={20} color={COLORS().purple} />,
      color: COLORS().purple,
    },
    {
      id: 4,
      title: 'Unidad de atención a victimas',
      action: () => navigation.navigate('ViolenciaFamiliarGeneroScreen'),
      icon: <Icons name="persona" type="zocial" size={20} color={COLORS().orange} />,
      color: COLORS().orange,
    },
  ];

  const renderMenu = () =>
    optionsMenu.map(option => (
      <TouchableWithoutFeedback onPress={option.action} key={option.id}>
        <Option>
          {option.icon}
          <OptionText color={option.color}>{option.title}</OptionText>
        </Option>
      </TouchableWithoutFeedback>
    ));

  return <MenuWrapper>{renderMenu()}</MenuWrapper>;
};

const MenuWrapper = styled(View)`
  width: 90%;
  align-self: center;
  margin: 20px 0;
`;

const Option = styled(View)`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  margin: 3px 0;
`;

const OptionText = styled(Text)`
  color: ${props => props?.color ?? COLORS().purple};
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
  flex: 1;
  text-transform: uppercase;
`;

export default MenuSection;
