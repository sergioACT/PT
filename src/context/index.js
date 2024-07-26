import React, {createContext, useEffect, useState} from 'react';
import {getAsyncStorage, setAsyncStorage, clearAsyncStorage, deleteItemAsyncStorage} from './helper';

export const Context = createContext({});

export const Provider = props => {
  const {children} = props;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [persistentData, setPersistentData] = useState({});
  const [persistentDataLoaded, setPersistentDataLoaded] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [newValues, setNewValues] = useState({});
  const [newEmail, setNewEmail] = useState({});
  const [currentEmergency, setCurrentEmergency] = useState(null);
  const [realEmergency, setRealEmergency] = useState(null);

  useEffect(() => {
    getAsyncStorage('userData')
      .then(value => {
        if (value) {
          setUserData(JSON.parse(value));
          setIsLoggedIn(Object.entries(value).length > 0);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setUserDataLoaded(true));

    getAsyncStorage('persistentData')
      .then(value => {
        if (value) {
          setPersistentData(JSON.parse(value));
        }
      })
      .catch(err => console.log(err))
      .finally(() => setPersistentDataLoaded(true));
  }, []);

  useEffect(() => {
    if (Object.entries(persistentData).length > 0) {
      setAsyncStorage('persistentData', persistentData);
    }
  }, [persistentData]);

  const saveUserData = (values, checked) => {
    setIsLoggedIn(Object.entries(values).length > 0);
    setUserData(values);

    if (checked) {
      setAsyncStorage('userData', values);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    deleteItemAsyncStorage('userData');
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        setGlobalLoading,
        globalLoading,
        userData,
        setUserData,
        clearAsyncStorage,
        persistentDataLoaded,
        setPersistentDataLoaded,
        userDataLoaded,
        userDataLoaded,
        newValues,
        setNewValues,
        newEmail,
        setNewEmail,
        saveUserData,
        handleLogout,
        currentEmergency,
        setCurrentEmergency,
        realEmergency,
        setRealEmergency,
      }}>
      {children}
    </Context.Provider>
  );
};

export default {Context, Provider};
