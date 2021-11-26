import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, collection, doc, onSnapshot, setDoc, getDocs, query, where } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBsoLePJhAF_g3uNEjAM97G6u6s72yhh44",
    authDomain: "hackathon-rps.firebaseapp.com",
    projectId: "hackathon-rps",
    storageBucket: "hackathon-rps.appspot.com",
    messagingSenderId: "325210299413",
    appId: "1:325210299413:web:dffc9fe1f5407a9073c21c",
    measurementId: "G-R2JZLJ94Z7"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export const firestore = getFirestore()
export const storage = getStorage()
//export const STATE_CHANGED = storage.TaskEvent.STATE_CHANGED
export const googleAuthProvider = new GoogleAuthProvider()
//export const fromMillis = firestore.Timestamp.fromMillis
//export const serverTimestamp = firestore.FieldValue.serverTimestamp


/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserByUsername(username) {
    const usersRef = collection('users')
    const query = usersRef.where('username', '==', username).limit(1)
    const userDoc = (await query.get()).docs[0]
    return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function docToJson(doc) {
    const data = doc.data()
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    }
}

export async function getAllUsers() {
    const snapshot = await getDocs(collection(firestore, 'users'))
    let users = []
    snapshot.forEach(doc => users.push({ id: doc.id, ...doc.data() }))
    return users
}

export async function changeUserDoc(uid, payload){
	const usersRef = collection(firestore, 'users');
	const userDoc = doc(usersRef, uid);

	setDoc(userDoc, payload, { merge: true });
}