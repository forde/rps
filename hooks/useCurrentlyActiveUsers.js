import { useEffect, useState } from 'react';
import { firestore } from '~/firebase'
import { collection, doc, onSnapshot, setDoc, query, where, limit } from 'firebase/firestore'


const useCurrentlyActiveUsers = () => {
 	const [activeUsers, setActiveUsers] = useState([]);
	useEffect(() => {
		const q = query(collection(firestore, 'users'), where('active', '==', true));
		const unsub = onSnapshot(q, (qSnap) => {
			const realtimeActive = [];
			qSnap.forEach((doc) => {
				realtimeActive.push(doc.data());
			});
			setActiveUsers(realtimeActive);
		});
		return unsub;
	}, [])
	
	return activeUsers;
}

export default useCurrentlyActiveUsers;