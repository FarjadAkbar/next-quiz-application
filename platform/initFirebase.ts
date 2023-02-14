import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

import {
  NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID,
} from "configs";


export const initFirebase = async (): Promise<void> => {
  await initializeApp({
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: NEXT_PUBLIC_FIREBASE_APP_ID,
  });
};


// Initialize Firebase
export const app = initializeApp({
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID,
});


// Initialize Cloud Firestore and get a reference to the service
export const database = getFirestore(app);