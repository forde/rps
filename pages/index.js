import { UserContext } from 'context'
import { useContext } from 'react'
import Auth from '~/components/Auth'
import { changeUserDoc } from '~/firebase'
import useOngoingTournament from '~/hooks/useOngoingTournament'

export default function Home () {
	const { user } = useContext(UserContext);
    // getAllUsers() // just to get the user list in console for tests

    const { tournament } = useOngoingTournament() // get ongoing tournament
	const handleClick = () => {
		if(!user) return;
		changeUserDoc(user.uid, { active: true })
	}

    return (
        <>
            <Auth/>
			<button onClick={handleClick}>I AM ACTIVE</button>
        </>
    )
}