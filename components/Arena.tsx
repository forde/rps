
import { auth } from '~/../firebase';
import { useEffect, useState } from 'react'

function Arena({players, game}) {
    const [loggedInUser, setLoggedInUser] = useState(null);
    console.log('players', players);
    console.log('game', game);

    if(!game) return null


    const sortedPlayers = {}
    for (const player of players) {
        sortedPlayers[player.id] = player;
    }
    const player1 = {...game.players[0], ...sortedPlayers[game.players[0].id]}
    const player2 = {...game.players[1], ...sortedPlayers[game.players[1].id]}

    return (
        <>
            <div className="flex flex-row content-between p-20">
                <Player player={player1}/>
                <VS/>
                <Player player={player2}/>
            </div>
            <p className="hidden">It is your turn</p>
        </>
    )
}

function Player({player}) {

    const imgSrc = player?.photoURL || "https://i.pravatar.cc/150?u=" + Math.random();
    return(
        <div className="flex flex-col flex-1">
            <img src={imgSrc} className=""/>
            <p className="text-center">
                {player.displayName}
            </p>
        </div>
    )
}

function VS() {
    return (
        <div className="flex-1  content-center">
            <img className="justify-self-center" src="vs.jpeg"/>
        </div>
    )
}

export default Arena;
