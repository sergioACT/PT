import {collection, addDoc, getDocs, query, where} from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

import {database} from '../config';

const collectionReports = collection(database, 'Reports');

export const addReport = async data => {
  return await addDoc(collectionReports, data);
};

export const getReports = async userId => {
  const q = query(collectionReports, where('userId', '==', userId));

  return await getDocs(q);
};

export const uploadImage = async (image, name) => {
  const response = await fetch(image.uri);
  const blob = await response.blob();

  const storage = getStorage();
  const imageRef = ref(storage, name);

  return uploadBytesResumable(imageRef, blob);
};

export const getImage = async ref => {
  return getDownloadURL(ref);
};
