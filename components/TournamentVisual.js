import styled from 'styled-components';

export default function TournamentVisual({
	tournament,
}){
	return(
		<TournamentGrid className={`tournament-grid`}>
			{tournament.rounds.map((round, i) => {
				return (
					<div
						key={i}
						className="round-wrapper"
					>
						<h2>Round: {i+1}</h2>
						<ul
							className={`${
								round.ongoing ? 'in-progress' : 'round-completed'
							}`}
						>
							{round.games.map((game, i) => {
								const winnerDeclared = game.winner;
								return !winnerDeclared ? (
									<li key={i} className="game-wrapper">
										{game.players.map((player, i) =>
											<p key={i}> {player.name} chose {player.choice ?? 'nothing yet'}</p>
										)}
									</li>
								) : (
									<li>
										<p>{game.winner} won!</p>
									</li>
								)
							})}
						</ul>
					</div>
				);
			})}
		</TournamentGrid>
	)
}


const TournamentGrid = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	.round-wrapper{
		padding: 15px 25px;
		border: solid 1px black;
		display: flex;
		flex-direction: column;
	}
`;