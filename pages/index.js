import { useContext } from "react";
import Image from "next/image";
import Auth from "~/components/Auth";
import Illustration from "../public/rockz-desktop.jpeg";
import Arena from '~/components/Arena'
import Selector from '~/stories/Selector'
import TournamentVisual from '~/components/TournamentVisual'

import useOngoingTournament from "~/hooks/useOngoingTournament";
import Actionables from "~/components/Actionables";
import useCurrentlyActiveUsers from "~/hooks/useCurrentlyActiveUsers";
import { UserContext, TournamentContext } from "~/context";

import { toClassString } from "utils/formater";

export default function Home() {

	const { tournament, game, canChoose } = useContext(TournamentContext)

	const activeUsers = useCurrentlyActiveUsers()

	console.log('tournament', tournament, 'game', game);

  	const { user, displayName, photoURL } = useContext(UserContext);

  const textVariant = (name) => (name === displayName ? "font-semibold" : "");

  if (!user) return <Auth />;

  if (!tournament)
    return (
      <section className='pt-12'>
        <div className='container container__grid medium:bg-green-50 medium:rounded-r-2xl overflow-hidden'>
          <div className='col-start-1 medium:col-start-2 col-end-11 row-start-2 row-end-3 medium:row-start-1 medium:row-end-2 mt-6 medium:mt-12 mb-4'>
            <p className='font-semibold text-2xl'>
              Players currently in lobby: {activeUsers.length}
            </p>
            <ul className='flex flex-wrap mt-6 mb-0'>
              {activeUsers.map(({ displayName }, i) => {
                return (
                  <li
                    className={toClassString([
                      "w-1/2",
                      textVariant(displayName),
                    ])}
                    key={i}
                  >
                    {displayName}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className='col-start-1 medium:col-start-2 col-end-11 row-start-3 row-end-4 medium:row-start-2 medium:row-end-3 mb-12 mt-auto'>
            <Actionables />
          </div>
          <div className='col-start-1 col-end-8 row-start-1 row-end-2 medium:col-start-13 medium:col-end-24 medium:row-end-3'>
            <Image
              src={Illustration}
              layout='responsive'
              width={1}
              height={1}
            />
          </div>
        </div>
      </section>
    );

  return <>
  			<Auth />
          <div className="container text-center">
            <Arena />
            {canChoose && <Selector />}
            <TournamentVisual tournament={tournament} />
          </div>
  </>
}
