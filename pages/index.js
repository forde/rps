import Auth from '~/components/Auth'
import useOngoingTournament from '~/hooks/useOngoingTournament'
import Actionables from '~/components/Actionables'

export default function Home () {
	
    // getAllUsers() // just to get the user list in console for tests

    const { tournament } = useOngoingTournament() // get ongoing tournament

    return (
        <>
            <Auth/>
			<Actionables />
        </>
    )
}