const functions = require("firebase-functions");
const region = "europe-west1";

const db = require("./lib/api/db");

// Fine non-es6 modules JS, we'll do it your way.
exports.startGame = functions.region(region).https.onCall(async (data, context) => {
    //const { var1, var2 } = data;

    await db.createGame();
    
    // Let the async cloud function know that it is done.
    return true;
});
