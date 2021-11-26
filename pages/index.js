import { useEffect, useState, useContext } from "react";
import Auth from "~/components/Auth";
import Card from "~/components/ui/Card";
import Selector from "~/stories/Selector";
import Actionables from "~/components/Actionables";
import { TournamentContext } from "context";
import useCurrentlyActiveUsers from "~/hooks/useCurrentlyActiveUsers";

export default function Home() {
  // console.log('active usersssss', activeUsers());
  const { tournament } = useContext(TournamentContext);
  const activeUsers = useCurrentlyActiveUsers();

  console.log('ongoing tournament', tournament);
  return (
    <section>
      <Auth />
      <Card className='bg-green-100 container'>
        Players currently in lobby: {activeUsers.length}
        <ul>
          {activeUsers.map(({ displayName }, i) => {
            return <li key={i}>{displayName}</li>;
          })}
        </ul>
      </Card>
      <div className='container'>
        <Selector />
      </div>
      <Actionables />
    </section>
  );
}
