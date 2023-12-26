import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {

    apiKey: "AIzaSyDGHwJyElJTCzCGaGewYnqYZiLgazpIKGs",

    authDomain: "svelte-realtime-chat-app.firebaseapp.com",

    projectId: "svelte-realtime-chat-app",

    storageBucket: "svelte-realtime-chat-app.appspot.com",

    messagingSenderId: "816155998530",

    appId: "1:816155998530:web:d082e68527813cd6cb70db"

};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();