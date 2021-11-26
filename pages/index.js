import { useContext } from "react";
import Auth from "~/components/Auth";
import Card from "~/components/ui/Card";
import Selector from "~/stories/Selector";
import Actionables from "~/components/Actionables";
import { TournamentContext } from "context";
import useCurrentlyActiveUsers from "~/hooks/useCurrentlyActiveUsers";
import TournamentVisual from '~/components/TournamentVisual';

export default function Home() {

	const { tournament, game, canChoose } = useContext(TournamentContext)

	const activeUsers = useCurrentlyActiveUsers()

	const tournamentStarted = tournament?.ongoing

	console.log('tournament', tournament, 'game', game);

	return (
		<section>
			{!tournamentStarted &&
				<>
					<Auth />
					<Card className='bg-green-100 container'>
						Players currently in lobby: {activeUsers.length}
						<ul>
							{activeUsers.map(({ displayName }, i) => {
							return <li key={i}>{displayName}</li>;
							})}
						</ul>
					</Card>
				</>
			}
			{tournamentStarted &&
				<div className='container'>
					<TournamentVisual tournament={tournament} />
					<Selector />
				</div>
			}
			{!tournamentStarted && <Actionables />}
		</section>
	);
}
