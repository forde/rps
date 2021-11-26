//import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

const serviceAccount = require('../../service-account.json');

const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
adminConfig.credential = admin.credential.cert(serviceAccount);
admin.initializeApp(adminConfig);

export default admin;

const firestore = admin.firestore();
export { firestore };

//const firebase = admin.database();
//export { firebase }
