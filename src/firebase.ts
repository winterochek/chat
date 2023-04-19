import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
   apiKey: 'AIzaSyC624SPk1Ldu018rnxtDj7OZj0FhR0Ppmc',
   authDomain: 'chat-948de.firebaseapp.com',
   projectId: 'chat-948de',
   storageBucket: 'chat-948de.appspot.com',
   messagingSenderId: '441028405968',
   appId: '1:441028405968:web:7ab036f9f46fa098494cd5',
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()