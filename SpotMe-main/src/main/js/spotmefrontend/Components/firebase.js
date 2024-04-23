import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAAHuBasKN3jrzugErYtRsh7beQJ1bSQS4",
  authDomain: "spotme-56e5b.firebaseapp.com",
  projectId: "spotme-56e5b",
  storageBucket: "spotme-56e5b.appspot.com",
  messagingSenderId: "759080972656",
  appId: "1:759080972656:web:9f2f3b21190b2c10af5fb5",
  measurementId: "G-FCPPVG8YQF"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db, auth };