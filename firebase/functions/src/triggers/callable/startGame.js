import * as functions from "firebase-functions";

import { region } from "../const/region";

// https://firebase.google.com/docs/functions/callable

export const startGame = functions
    .region(region)
    .https
    .onCall(async (data, context) => {
        console.log('test123456789087654321');

        // Let cloud function know that it is done.
        return true;
});