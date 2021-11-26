//import * as functions from 'firebase-functions'
const admin = require('firebase-admin');
const app = require('firebase/app');
const serviceAccount = require('../service-account.json');
// Y U NO SUPPORT MODULAR JS GOOGLE.

// I am convinced firebase hates me, what is this new requirement, no uppercase in env, when it is explicitly uppercase.
//const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const firebaseConfig = {
    apiKey: "AIzaSyBsoLePJhAF_g3uNEjAM97G6u6s72yhh44",
    authDomain: "hackathon-rps.firebaseapp.com",
    projectId: "hackathon-rps",
    storageBucket: "hackathon-rps.appspot.com",
    messagingSenderId: "325210299413",
    appId: "1:325210299413:web:dffc9fe1f5407a9073c21c",
    measurementId: "G-R2JZLJ94Z7",
    credential: admin.credential.cert(serviceAccount)
};

admin.initializeApp(firebaseConfig);

const initializedApp = app.initializeApp(firebaseConfig);
const firestore = initializedApp.firestore;
const firestoreAdmin = admin.firestore;
