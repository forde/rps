import { UserContext } from 'context'
import { useContext } from 'react'
import Auth from '~/components/Auth'
import useOngoingTournament from '~/hooks/useOngoingTournament'
import Actionables from '~/components/Actionables'

export default function Home () {
	const { user } = useContext(UserContext);
    // getAllUsers() // just to get the user list in console for tests

    const { tournament } = useOngoingTournament() // get ongoing tournament

    return (
        <>
            <Auth/>
			<Actionables />
        </>
    )
}