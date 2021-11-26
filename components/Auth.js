import { useContext } from 'react'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { googleAuthProvider, auth } from '~/firebase'
import { UserContext } from '~/context'

export default function Auth () {

    const { user, displayName, photoURL } = useContext(UserContext)

    const signIn = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((result) => GoogleAuthProvider.credentialFromResult(result))
            .catch((error) => console.log(error))
    }

    const signOut = async () => {
        await auth.signOut()
    }
    return (
        <Wrapper>
			{user &&
				<div>
					<img src={user?.photoURL} />
					<h1>{displayName}</h1>
				</div>
			}
            {!user ?
                <button className="clickable" onClick={signIn} >Sign in</button>
                :
                <button className="clickable" onClick={signOut} >Sign out</button>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`

`