import { useEffect, useState } from "react";
import Auth from "~/components/Auth";
import Card from "~/components/ui/Card";
import Selector from "~/stories/Selector";
import useOngoingTournament from "~/hooks/useOngoingTournament";
import Actionables from "~/components/Actionables";
import useCurrentlyActiveUsers from "~/hooks/useCurrentlyActiveUsers";

export default function Home() {
  // console.log('active usersssss', activeUsers());
  const { tournament } = useOngoingTournament(); // get ongoing tournament
  const activeUsers = useCurrentlyActiveUsers();
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
