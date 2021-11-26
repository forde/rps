import { useEffect, useState } from 'react'
import { collection, doc, addDoc, onSnapshot, orderBy, getDocs, setDoc, serverTimestamp, query, where, limit } from 'firebase/firestore'
import { firestore, getAllUsers } from '~/firebase'

export default function useOngoingTournament({ user } = {}) {

    const [ tournament, setTournament ] = useState(null)
    const [ game, setGame ] = useState(null)
    const [ canChoose, setCanChoose ] = useState(false)

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
        if(!user || !tournament) return

        // set ongoing game current user can participate in
        const latestRound = last(tournament.rounds)
        let _usersGame = null
        if(latestRound && latestRound.ongoing && latestRound.games) {
            _usersGame = latestRound.games.filter(game => game.players.map(p => p.id).includes(user.uid))[0]
            setGame(_usersGame || null)
        }

        // set canChoose flag for the ongoing game
        if(_usersGame) {
            const [ first, second ] = _usersGame.players
            // if user is first -  can choose
            if((first.id === user.uid) && (first.choice === null)) setCanChoose(true)
            // is user is second - can choose only if first user made chis choice
            if((second.id === user.uid) && (first.choice !== null)) setCanChoose(true)
        }

    }, [tournament])

    const last = array => array[array.length - 1]

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
            .map(u => ({ id: u.id, name: u.displayName, photoUrl: u.photoUrl }))

        // format games array
        const games = pair(participants, { id: 'bot', name: 'Bot', photoUrl: 'https://assets.wordstream.com/s3fs-public/styles/simple_image/public/images/media/images/facebook-messenger-bots-robot.jpg?e2HI5ngWraq13ZjAOec1O6C6WAw5bHyB&itok=JL3-yeqn' }).map(game => ({
            winner: null,
            players: game.map(player => ({
                id: player.id,
                name: player.name,
                photoUrl: player.photoUrl || 'https://i.stack.imgur.com/gMbrL.jpg',
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
        canChoose,
    }
}