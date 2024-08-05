import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore, initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA6iG8ZTol76KK8p-AnScqd6kuTLHpp5Ns",
  authDomain: "torreonseguro-a0c6d.firebaseapp.com",
  projectId: "torreonseguro-a0c6d",
  storageBucket: "torreonseguro-a0c6d.appspot.com",
  messagingSenderId: "16338292608",
  appId: "1:16338292608:web:4dec8c417536cdd860fb65"
};

const app = initializeApp(firebaseConfig);
const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const auth = getAuth(app);

export {database, auth};
