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
						<ul
							className={`games ${
								round.ongoing ? 'in-progress' : 'round-completed'
							}`}
						>
							{round.games.map((game, i) => {
								const winnerDeclared = game.winner;
								return(
									<li key={i} className="game-wrapper">
										{!winnerDeclared ? (
											<div key={i} className="players">
												{game.players.map((player, i) =>
													<p key={i}> {player.name} chose {player.choice ?? 'nothing yet'}</p>
												)}
											</div>
										) : (
											<div>
												<p>{game.winner} won!</p>
											</div>
										)}
									</li>
								);
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
		.games{
			display: flex;
			column-gap: 25px;
			.game-wrapper{
				border: solid 1px black;
				padding: 10px;
				.players{
					display: flex;
				}
			}
		}
	}
`;