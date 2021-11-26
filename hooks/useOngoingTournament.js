import { UserContext } from 'context'
import { useEffect, useState, useContext } from 'react'
import { collection, doc, addDoc, onSnapshot, orderBy, getDocs, setDoc, serverTimestamp, query, where, limit } from 'firebase/firestore'
import { firestore, getAllUsers } from '~/firebase'

export default function useOngoingTournament() {

    const [ tournament, setTournament ] = useState(null)
    const [ game, setGame ] = useState(null)

    const { user } = useContext(UserContext)

    useEffect(() => {

        let unsubscribe

        const tournamentsRef = collection(firestore, 'tournaments')

        const q = query(tournamentsRef, where('ongoing', '==', true), orderBy('created', 'desc'), limit(1))

        unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setTournament({ id: doc.id, ...doc.data() })
            })
        })

        return unsubscribe

    }, [])

    useEffect(() => {

    }, [tournament])

    const pair = (_items, _fill={})  => {

        const items = [..._items]
        if(_items.length%2) items.push(_fill)

        const splitAt = (i, xs) => [ xs.slice(0, i), xs.slice(i, xs.length) ]
        const shuffle = (xs) => xs.slice(0).sort(() => .5 - Math.random())
        const zip = (xs) => xs[0].map((_,i) => xs.map(x => x[i]))

        return zip(splitAt(items.length/2, shuffle(items)))
    }

    const startTournament = async () => {

        // make all trunaments that are ongoing - "not ongoing" :D
        const q = query(collection(firestore, 'tournaments'), where('ongoing', '==', true))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(async tur => {
            await setDoc(doc(firestore, 'tournaments', tur.id), { ongoing: false }, { merge: true });
        })

        // gather participants
        const users = await getAllUsers()
        const participants = users
            .filter(u => u.active === true)
            .map(u => ({ id: u.id, name: u.displayName }))

        // format games array
        const games = pair(participants, { id: 'bot', name: 'Bot' }).map(game => ({
            winner: null,
            players: game.map(players => ({
                id: players.id,
                choice: null
            }))
        }))

        // create tournament document
        const data = {
            created: serverTimestamp(),
            ongoing: true,
            rounds: [{
                ongoing: true,
                games: games
            }],
        }

        await addDoc(collection(firestore, 'tournaments'), data)
    }

    return {
        tournament,
        startTournament,
        game,
    }
}