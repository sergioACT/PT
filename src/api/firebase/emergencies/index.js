import {collection, addDoc, doc, updateDoc} from 'firebase/firestore';

import {database} from '../config';

export const collectionEmergencies = collection(database, 'Emergencies');

export const addEmergency = async data => {
  return await addDoc(collectionEmergencies, data);
};

export const updateEmergency = async (data, emergencyId) => {
  const docRef = doc(database, 'Emergencies', emergencyId);
  return await updateDoc(docRef, {...data});
};
