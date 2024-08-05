import {useEffect, useState, useCallback} from 'react';
import Geolocation from '@react-native-community/geolocation';

const useGeolocation = ({enableHighAccuracy, maximumAge, timeout} = {}, callback, isEnabled = true) => {
  const [coordinates, setCoordinates] = useState({
    accuracy: 5,
    altitude: null,
    altitudeAccuracy: 0.5,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: null,
    error: null,
  });

  const updateCoordinates = useCallback(
    ({coords, timestamp}) => {
      const {accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed} = coords;

      setCoordinates({
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed,
        timestamp,
        error: null,
      });

      if (typeof callback === 'function') {
        callback({
          accuracy,
          altitude,
          altitudeAccuracy,
          heading,
          latitude,
          longitude,
          speed,
          timestamp,
          error: null,
        });
      }
    },
    [callback],
  );

  const setError = useCallback(error => {
    setCoordinates({
      accuracy: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: null,
      longitude: null,
      speed: null,
      timestamp: null,
      error,
    });
  }, []);

  useEffect(() => {
    let watchId;

    if (isEnabled) {
      Geolocation.getCurrentPosition(updateCoordinates, setError);
      watchId = Geolocation.watchPosition(updateCoordinates, setError, {
        enableHighAccuracy,
        maximumAge,
        timeout,
      });
    }

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, [isEnabled, callback, enableHighAccuracy, maximumAge, setError, timeout, updateCoordinates]);

  return coordinates;
};

export default useGeolocation;
