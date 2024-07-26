import React, {useState} from 'react';
import {FlatList, Text, TouchableWithoutFeedback, View} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../../../assets/theme/colors';
import BasicButton from '../../../../components/Button';
import {getIncidents} from '../../../../assets/data/listIncident';
import CustomAlert from './../../../../components/CustomAlert';
import BasicInput from '../../../../components/Input';
import Icons from '../../../../components/Icons';

const ModalIncidents = props => {
  const {visible, handleOpenClose, handleSetIncident, title = 'Busca el incidente', placeholder = 'Busca un incidente', list = getIncidents()} = props;
  const [filteredIncidents, setFilteredIncidents] = useState(list);
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentIncident, setCurrentIncident] = useState({});

  const originalIncidents = list;

  const handleSelect = item => setCurrentIncident(item);

  const handleChangeTextCustomModal = text => {
    const textLower = text.toLowerCase();
    setCurrentSearch(text);

    setFilteredIncidents(originalIncidents.filter(incident => incident.value.toLowerCase().includes(textLower)));
  };

  return (
    <CustomAlert visibility={visible} handleClose={handleOpenClose} height={500}>
      <ContainerCustomAlert>
        <Row>
          <Title>{title}</Title>
          <TouchableWithoutFeedback onPress={handleOpenClose}>
            <View>
              <Icons name="close" type="ant" size={25} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </Row>
        <Row>
          <BasicInput value={currentSearch} onChangeText={handleChangeTextCustomModal} placeholder={placeholder} />
        </Row>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            borderColor: COLORS().grayInput,
            borderWidth: 1,
          }}
          data={filteredIncidents}
          renderItem={({item}) => (
            <TouchableWithoutFeedback onPress={() => handleSelect(item)}>
              <SelectedContainer selected={currentIncident?.id === item?.id}>
                <Incident>{item.value}</Incident>
              </SelectedContainer>
            </TouchableWithoutFeedback>
          )}
        />
        <NewReportButtonStyled text={'Guardar'} onPress={() => handleSetIncident(currentIncident)} backgroundColor={COLORS().blue} colorText={COLORS().white} />
      </ContainerCustomAlert>
    </CustomAlert>
  );
};

const NewReportButtonStyled = styled(BasicButton)`
  margin-top: 10px;
`;

const Title = styled(Text)`
  flex: 1;
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

const Incident = styled(Text)`
  padding: 13px 10px;
  color: black;
  border-bottom-color: ${COLORS().grayInput};
  border-bottom-width: 1px;
`;

const ContainerCustomAlert = styled(View)`
  width: 100%;
  padding: 10px 15px;
  flex: 1;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const SelectedContainer = styled(View)`
  background-color: ${props => (props.selected ? COLORS().grayInput : COLORS().white)};
`;

export default ModalIncidents;
