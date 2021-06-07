import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA_e3iezE-EuVwdkBidIkL6hS4tqr_Zfcs",
  authDomain: "chat-70271.firebaseapp.com",
  projectId: "chat-70271",
  storageBucket: "chat-70271.appspot.com",
  messagingSenderId: "616651401293",
  appId: "1:616651401293:web:9687645eeca6bc2dde5404"
};

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;