import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSecureStore = async (key, value) => {
  try {
    await EncryptedStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
  } catch (e) {
    console.log(error);
  }
};

export const getSecureStore = async key => {
  let value = {};

  try {
    value = await EncryptedStorage.getItem(key);
  } catch (e) {
    console.log(error);
  }

  return value;
};

export const deleteItemSecureStore = async key => {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e) {
    console.log(error);
  }
};

export const setAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAsyncStorage = async key => {
  let value = {};

  try {
    value = await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }

  return value;
};

export const deleteItemAsyncStorage = async key => {
  let value = {};

  try {
    value = await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }

  return value;
};

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
