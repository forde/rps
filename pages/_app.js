import { UserContext, TournamentContext } from '~/context'
import { useUserData } from '~/hooks'
import Head from 'next/head'
import useOngoingTournament from '~/hooks/useOngoingTournament'

import styles from '~/styles'

function App ({ Component, pageProps }) {

    const userData = useUserData()

    const ongoingTournamentData = useOngoingTournament()

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta id="viewport" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, shrink-to-fit=yes" />
            </Head>
            <UserContext.Provider value={userData}>
                <TournamentContext.Provider value={ongoingTournamentData}>
                    <Component {...pageProps} />
                </TournamentContext.Provider>
            </UserContext.Provider>
        </>
    )
}

export default App