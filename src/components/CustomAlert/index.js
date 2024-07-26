import React from 'react';

import {Modal, View} from 'react-native';

const CustomAlert = props => {
  const {visibility, children, height, handleClose} = props;
  return (
    <View>
      <Modal visible={visibility} animationType={'fade'} transparent={true} onRequestClose={handleClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              backgroundColor: 'white',
              width: '90%',
              height,
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 7,
              elevation: 10,
            }}>
            {children}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomAlert;
