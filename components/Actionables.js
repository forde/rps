import { UserContext } from 'context'
import { useContext } from 'react'
import { changeUserDoc } from '~/firebase'

export default function Actionables(){
	const { user } = useContext(UserContext);

	const handleSetActive = () => {
		if (!user) return;
		changeUserDoc(user.uid, { active: true })
	}

	const handleSetInactive = () => {
		if (!user) return;
		changeUserDoc(user.uid, { active: false })
	}

	const handleStartSession = () => {
		alert('Start session');
	}

	return(
		<>
			<button onClick={handleSetActive}>I AM ACTIVE</button>
			<button onClick={handleSetInactive}>I AM INACTIVE</button>
			<button onClick={handleStartSession}>Start game session</button>
		</>
	);
}