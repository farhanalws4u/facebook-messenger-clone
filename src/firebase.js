import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDsT4avfOGlV0MDXIhPs19CD8J-jPREk4M",
  authDomain: "facebook-messenger-clone-8269d.firebaseapp.com",
  projectId: "facebook-messenger-clone-8269d",
  storageBucket: "facebook-messenger-clone-8269d.appspot.com",
  messagingSenderId: "585982491477",
  appId: "1:585982491477:web:187baa5e397684dc670ddc",
  measurementId: "G-FQ6VFFC93T",
});

const db = firebaseApp.firestore();

export default db;
