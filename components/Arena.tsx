
import { auth } from '~/../firebase';
import { useEffect, useState, useContext } from 'react'
import { UserContext, TournamentContext } from "~/context";

function Arena() {

    const { game, canChoose } = useContext(TournamentContext)
    const { user } = useContext(UserContext);

    if(!game) return null

    const player1 = game.players[0]
    const player2 = game.players[1]

    const canChooseCheck = player => {

        const isMe = player.id === user.uid

        if(!isMe && !canChoose) return true
        if(isMe && canChoose) return true
        return false
    }

    return (
        <>
            <div className="flex flex-row content-between p-20">
                <Player player={player1} canChoose={canChooseCheck(player1)} />
                <VS/>
                <Player player={player2} canChoose={canChooseCheck(player2)}/>
            </div>
            <p className="hidden">It is your turn</p>
        </>
    )
}

function Player({player, canChoose}) {
    const imgSrc = player?.photoUrl|| "https://i.pravatar.cc/150?u=" + Math.random();
    return(
        <div className="flex flex-col flex-1" style={{ border: canChoose ? '10px solid red' : ''}}>
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
