import React, {useState} from 'react';
import {
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styled from 'styled-components';
import {COLORS} from '../../assets/theme/colors';

const deviceHeight = Dimensions.get('window').height;

const BottomPopup = props => {
  const {handleClose, isVisible, onTouchOutside, title, modalRef, children} =
    props;

  const [showModal, setShowModal] = useState(false);

  const renderOutsideTouchable = onTouch => {
    const view = <View style={{flex: 1, width: '100%'}} />;

    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };

  const renderTitle = () => (
    <View>
      <OptionText> {title}</OptionText>
    </View>
  );

  return (
    <Modal
      ref={modalRef}
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000000AA',
          justifyContent: 'flex-end',
        }}>
        {renderOutsideTouchable(onTouchOutside)}
        <View
          style={{
            backgroundColor: COLORS().white,
            width: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            paddingHorizontal: 10,
            maxHeight: deviceHeight * 0.4,
            paddingVertical: 15,
          }}>
          {renderTitle()}
          {children}
        </View>
      </View>
    </Modal>
  );
};

const OptionText = styled(Text)`
  color: ${COLORS().black};
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
`;

export default BottomPopup;
