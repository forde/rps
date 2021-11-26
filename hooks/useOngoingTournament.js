import { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query, where, limit } from 'firebase/firestore'
import { firestore } from '~/firebase'

export default function useOngoingTournament() {

    const [ tournament, setTournament ] = useState(null)

    useEffect(() => {

        let unsubscribe

        const tournamentsRef = collection(firestore, 'tournaments')

        const q = query(tournamentsRef,
                        where('ongoing', '==', true),
                        orderBy('created'),
                        limit(1)
                       )

        unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setTournament({ id: doc.id, ...doc.data() })
            })
        })

        return unsubscribe

    }, [])

    return {
        tournament
    }
}