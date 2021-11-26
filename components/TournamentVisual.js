import styled from 'styled-components';

import { Row, Col } from '~/styles'

export default function TournamentVisual({
	tournament,
}){

	return(
		<TournamentGrid className={`tournament-grid`}>
			{tournament.rounds.map((round, i) => {
				return (
					<div key={i} className="round-wrapper" >
						<Row
							className={`games ${
								round.ongoing ? 'in-progress' : 'round-completed'
							}`}
						>
							{round.games.map((game, i) => {
								const winnerDeclared = game.winner;
								return(
									<Col width={12/round.games.length} key={i} className="game-wrapper">
										<Row className="players">
											{game.players.map((player, i) =>
												<Col width={6} key={i} className="player">
													<img src={player.photoUrl} />
													<span className="name">{player.name}</span>
												</Col>
											)}
										</Row>
									</Col>
								);
							})}
						</Row>
					</div>
				);
			})}
		</TournamentGrid>
	)
}


const TournamentGrid = styled.div`

	.round-wrapper{
		border: 1px dotted red;
		.games{

			.game-wrapper{
				border: 1px dotted blue;
				.players{
					.player {
						border: 1px dotted pink;
						display: flex;
						align-items: center;
						flex-direction: column;
						img {
							margin-bottom: 20px;
						}
						.name {
							display: block;
							width: 100%;
							text-align: center;
						}
					}
				}
			}
		}
	}
`;