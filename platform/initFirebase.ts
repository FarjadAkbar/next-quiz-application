import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
} from "configs";


export const initFirebase = async (): Promise<void> => {
  await firebase.initializeApp({
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  });
};


// Initialize Firebase
export const app = firebase.initializeApp({
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
});


// Initialize Cloud Firestore and get a reference to the service
export const database = app.firestore();
