import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBNSrC-2ZECAZ1WC19U9EGbPEkw16Nt9rQ",
    authDomain: "openshield-ac772.firebaseapp.com",
    projectId: "openshield-ac772",
    storageBucket: "openshield-ac772.appspot.com",
    messagingSenderId: "500263181100",
    appId: "1:500263181100:web:71d8aef4f78295b92caa89",
    measurementId: "G-CCEPN9ZWE4"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firetsore
const projectFirestore = firebase.firestore();

// init auth
const projectAuth = firebase.auth();

const projectStorage = firebase.storage();
// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }