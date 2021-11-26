import * as functions from "firebase-functions";
import { region } from "../const/region";

// https://firebase.google.com/docs/functions/firestore-events

/**
 * Should run when a user document is created.
 */
 export const onNewUser = functions
 .region(region)
 .firestore.document("user/{someId}")
 .onCreate(async (snapshot, context) => {
   // Get an object representing the newly created document.
   const data = snapshot.data();


   // Let cloud function know that it is done.
   return true;
});


