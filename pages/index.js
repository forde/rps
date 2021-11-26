import Auth from '~/components/Auth'
import useOngoingTournament from '~/hooks/useOngoingTournament'
import Actionables from '~/components/Actionables'

export default function Home () {

    const { tournament } = useOngoingTournament() // get ongoing tournament
    console.log('tournament', tournament);
    return (
        <>
            <Auth/>
			<Actionables />
        </>
    )
}