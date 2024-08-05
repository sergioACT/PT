import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Text} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled from 'styled-components';
import {COLORS} from '../../../assets/theme/colors';
import Icons from '../../../components/Icons';
import Screen from '../../../components/Screen';

const MapViewScreen = props => {
  const mapView = useRef(null);
  const {route} = props;
  const {saveLocation, currentLocation, originalReport} = route.params;
  const navigation = useNavigation();

  const [origin, setOrigin] = useState(currentLocation);
  const [report, setReport] = useState(originalReport);

  const insets =
    Platform.OS == 'android' ? {top: 0, bottom: 0} : useSafeAreaInsets();

  const handleGoBack = () => navigation.goBack();

  const handleSubmit = () => {
    saveLocation(origin);
    navigation.goBack();
  };

  const renderMap = () => (
    <Container>
      <MapStyled
        ref={mapView}
        style={{
          ...StyleSheet.absoluteFillObject,
        }}
        showsUserLocation
        initialRegion={{
          ...origin,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onRegionChangeComplete={region => {
          setOrigin({latitude: region.latitude, longitude: region.longitude});
        }}>
        {report && (
          <Marker
            coordinate={report.location.coords}
            title={report.incident}
            description={report.description}>
            <Icons
              type="entypo"
              name="location-pin"
              size={48}
              color={COLORS().purple}
            />
          </Marker>
        )}
      </MapStyled>
      <TouchableWithoutFeedback onPress={handleGoBack}>
        <MarkerWrapper top={insets?.top}>
          <Icons
            type="feather"
            name="arrow-left"
            size={35}
            color={COLORS().white}
          />
        </MarkerWrapper>
      </TouchableWithoutFeedback>

      {saveLocation && (
        <TouchableWithoutFeedback onPress={handleSubmit}>
          <MarkerWrapperRight bottom={insets?.bottom}>
            <Icons
              type="feather"
              name="plus"
              size={35}
              color={COLORS().white}
            />
          </MarkerWrapperRight>
        </TouchableWithoutFeedback>
      )}

      {!report && (
        <View
          style={{
            left: '50%',
            marginLeft: -24,
            marginTop: -48,
            position: 'absolute',
            top: '50%',
          }}>
          <Icons
            type="entypo"
            name="location-pin"
            size={48}
            color={COLORS().purple}
          />
        </View>
      )}

      {report && (
        <MarkerWrapperLeft bottom={insets?.bottom}>
          <Label>Dirección:</Label>
          <Address>{report.location.address}</Address>
        </MarkerWrapperLeft>
      )}
    </Container>
  );

  if (Platform.OS == 'android') {
    return <Screen>{renderMap()}</Screen>;
  } else {
    return renderMap();
  }
};

const Container = styled(View)`
  flex: 1;
  height: ${Dimensions.get('screen').height}px;
  width: ${Dimensions.get('screen').width}px;
`;

const MapStyled = styled(MapView)`
  flex: 1;
`;

const Circle = styled(View)`
  width: 55px;
  height: 55px;
  border-radius: 40px;
  background-color: ${COLORS().purple};
  justify-content: center;
  align-items: center;
`;

const MarkerWrapper = styled(Circle)`
  position: absolute;
  left: 20px;
  top: ${props => (props?.top && props.top) + 15}px;
`;

const MarkerWrapperRight = styled(Circle)`
  position: absolute;
  right: 20px;
  bottom: ${props => (props?.bottom && props.bottom) + 15}px;
`;

const MarkerWrapperLeft = styled(View)`
  position: absolute;
  width: 90%;
  left: 5%;
  bottom: ${props => (props?.bottom && props.bottom) + 15}px;
  background-color: ${COLORS().purple};
  border-radius: 4px;
  padding: 10px;
`;

const Label = styled(Text)`
  font-size: 17px;
  color: ${COLORS().white};
  word-wrap: break-word;
  font-weight: bold;
`;

const Address = styled(Label)`
  font-weight: normal;
`;
export default MapViewScreen;
