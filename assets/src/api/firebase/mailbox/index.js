import {collection, addDoc} from 'firebase/firestore';

import {database} from '../config';

const collectionSuggestion = collection(database, 'SuggestionMailbox');

export const addSuggestion = async data => {
  return await addDoc(collectionSuggestion, data);
};
