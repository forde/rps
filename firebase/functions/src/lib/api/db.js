import { firestore } from "../firebase";

// ########## Device User ##########

export async function getSomethingFromDb({ id }) {
  const snapshot = await firestore
    .collection("someCollection")
    .where("id", "==", id)
    .get();

  if (!snapshot.empty) {
    return snapshot.docs.map((doc) => doc.data().id);
  }

  return [];
}