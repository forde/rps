import { useEffect, useState } from 'react';
import Auth from '~/components/Auth'
import useOngoingTournament from '~/hooks/useOngoingTournament'
import Actionables from '~/components/Actionables'
import useCurrentlyActiveUsers from '~/hooks/useCurrentlyActiveUsers';

export default function Home () {
    const { tournament } = useOngoingTournament() // get ongoing tournament
	const activeUsers = useCurrentlyActiveUsers();
    return (
        <>
            <Auth/>
			<div>
				Players currently in lobby: {activeUsers.length}
				<ul>
				{activeUsers.map(({ displayName }, i) => {
					return <li key={i}>{displayName}</li>
				})}
				</ul>
			</div>
			<Actionables />
        </>
    )
}