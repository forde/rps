import { createContext } from 'react'

export const UserContext = createContext({ user: null, username: null })

export const TournamentContext = createContext({
    tournament: null,
    startTournament: () => null,
    game: null,
    canChoose: false,
})