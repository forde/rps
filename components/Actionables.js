import { UserContext } from "context";
import { useContext } from "react";
import { changeUserDoc } from "~/firebase";

import { toClassString } from "utils/formater";

export default function Actionables() {
  const { user } = useContext(UserContext);

  const handleSetActive = () => {
    if (!user) return;
    changeUserDoc(user.uid, { active: true });
  };

  const handleSetInactive = () => {
    if (!user) return;
    changeUserDoc(user.uid, { active: false });
  };

  const handleStartSession = () => {
    alert("Start session");
  };

  const buttonStyle =
    "rounded-xl p-2.5 bg-green-800 text-yellow-300 hover:bg-green-600 transition-all duration-200 w-full";

  return (
    <div>
      <div className='flex mb-4'>
        <button
          onClick={handleSetActive}
          className={toClassString(["w-full mr-2", buttonStyle])}
        >
          I AM ACTIVE
        </button>
        <button
          onClick={handleSetInactive}
          className={toClassString(["w-full", buttonStyle])}
        >
          I AM INACTIVE
        </button>
      </div>
      <button
        onClick={handleStartSession}
        className={toClassString(["block w-full", buttonStyle])}
      >
        Start game session
      </button>
    </div>
  );
}
