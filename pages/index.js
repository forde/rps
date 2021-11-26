import { useEffect, useState, useContext } from 'react';
import Auth from '~/components/Auth'
import Actionables from '~/components/Actionables'
import useCurrentlyActiveUsers from '~/hooks/useCurrentlyActiveUsers'
import { TournamentContext } from 'context'

export default function Home () {
	// console.log('active usersssss', activeUsers());
	const activeUsers = useCurrentlyActiveUsers();

	const { tournament } = useContext(TournamentContext)

	console.log('Ongoing tournament: ', tournament);

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