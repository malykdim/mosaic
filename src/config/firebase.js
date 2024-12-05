import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDb2XeKXk4X1gpIdQv0eF3-zxhufW6CNVs",
    authDomain: "damyanovi-5ec5b.firebaseapp.com",
    projectId: "damyanovi-5ec5b",
    storageBucket: "damyanovi-5ec5b.firebasestorage.app",
    messagingSenderId: "779503371110",
    appId: "1:779503371110:web:0479304db9527b4e97bea7",
    measurementId: "G-BCGM2VDQX4"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// Initialize Firestore
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

// Timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp }