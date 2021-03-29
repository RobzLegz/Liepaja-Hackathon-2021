import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCppP1fn4exkCrBsZok5u7N8gSdF6RW_lU",
  authDomain: "liepaja-hackathon.firebaseapp.com",
  projectId: "liepaja-hackathon",
  storageBucket: "liepaja-hackathon.appspot.com",
  messagingSenderId: "1048739916577",
  appId: "1:1048739916577:web:ec7ac2a32a427121ed6c60",
  measurementId: "G-45G49RX8ZF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
