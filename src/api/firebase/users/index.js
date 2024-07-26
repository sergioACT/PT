import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  updateEmail,
  EmailAuthProvider,
  sendEmailVerification,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {auth, database} from '../config';

export const collectionUsers = collection(database, 'Users');

export const collectionUserCurrentUser = userId =>
  doc(database, 'Users', userId);

export const addUser = async data => {
  return await addDoc(collectionUsers, data);
};

export const createUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const sendEmailV = async () => {
  return await sendEmailVerification(auth.currentUser);
};

export const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const verifyIsVerified = () => {
  return auth.currentUser?.emailVerified;
};

export const logout = async () => {
  return await signOut(auth);
};

export const getUser = async userId => {
  const q = query(collectionUsers, where('emailDoc', '==', userId));

  return await getDocs(q);
};

export const getUserWithNumber = async phone => {
  const q = query(collectionUsers, where('phone', '==', phone));

  return await getDocs(q);
};

export const reauthenticate = async currentPassword => {
  const credentials = EmailAuthProvider.credential(
    auth.currentUser.email,
    currentPassword,
  );

  return await reauthenticateWithCredential(auth.currentUser, credentials);
};

export const changePassword = async newPassword => {
  const user = auth.currentUser;

  return await updatePassword(user, newPassword);
};

export const forgotPassword = async email => {
  return await sendPasswordResetEmail(auth, email);
};

export const updateData = async (data, emailDoc) => {
  const docRef = doc(database, 'Users', emailDoc);
  return await updateDoc(docRef, {...data});
};

export const updateEmailUser = async (newEmail, password) => {
  return await reauthenticate(password)
    .then(async res1 => {
      return await updateEmail(auth.currentUser, newEmail);
    })
    .catch(error => {
      throw new Error(error);
    });
};

export const checkIsLogged = () => {
  return auth.currentUser != undefined && auth.currentUser != null;
};
