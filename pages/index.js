import Auth from '~/components/Auth'
import { getAllUsers } from '~/firebase'
import useOngoingTournament from '~/hooks/useOngoingTournament'

export default function Home () {

     getAllUsers() // just to get the user list in console for tests

    const { tournament } = useOngoingTournament() // get ongoing tournament

    console.log('tournament', tournament);

    return (
        <>
            <Auth/>
        </>
    )
}