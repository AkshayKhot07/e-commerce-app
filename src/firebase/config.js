import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0OVK4c6CAoaGkrjUsxy7JLTp4Ib-fWtU",
  authDomain: "e-commerce-app-b7b4c.firebaseapp.com",
  projectId: "e-commerce-app-b7b4c",
  storageBucket: "e-commerce-app-b7b4c.appspot.com",
  messagingSenderId: "987142648230",
  appId: "1:987142648230:web:844986a9601cd1502d9f67",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp, projectStorage };
