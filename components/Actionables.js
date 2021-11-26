import { UserContext, TournamentContext } from "context";
import { useContext } from "react";
import { changeUserDoc } from "~/firebase";

export default function Actionables() {

  const { user } = useContext(UserContext);

  const { startTournament } = useContext(TournamentContext);

  const handleSetActive = () => {
    if (!user) return;
    changeUserDoc(user.uid, { active: true });
  };

  const handleSetInactive = () => {
    if (!user) return;
    changeUserDoc(user.uid, { active: false });
  };

  const handleStartSession = () => {
    startTournament();
  };

  return (
    <div className='container'>
      <div className='bg-red-50 flex flex-col'>
        <button onClick={handleSetActive}>I AM ACTIVE</button>
        <button onClick={handleSetInactive}>I AM INACTIVE</button>
        <button onClick={handleStartSession}>Start game session</button>
      </div>
    </div>
  );
}
