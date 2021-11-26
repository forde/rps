import React, { useState, useContext } from "react";
import Image from "next/image";
import { toClassString } from "@utils/formater";
import { StyleVariantType } from "@/types/styles";
import R from '../public/R.png';
import P from '../public/P.png';
import S from '../public/S.png';
import { TournamentContext } from '~/context'

const selectors = ["R", "P", "S"];

const icons = {R, P, S};

export interface SelectorProps {}

export interface SelectorButtonProps {
  icon: "R" | "P" | "S";
  onClick: () => void;
}

const SelectorButton = ({ icon, onClick, isSelected }) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    if (isSelected) return null;
    setIsActive(true);
    onClick();
  };
  const bgVariant: string = isActive ? "bg-green-400" : "bg-green-300";
  const cursorVariant: string = isActive ? "default" : "pointer";
  return (
    <button
      className={toClassString([
        "rounded-full w-48 h-48 hover:bg-green-400 transition-all duration-200",
        bgVariant,
      ])}
      onClick={handleClick}
    >
      <Image
	  	priority
        src={icons[icon]}
        layout='responsive'
        width={1}
        height={1}
      />
    </button>
  );
};

export const Selector: React.FC<SelectorProps> = ({ ...props }) => {
  const [isSelected, setIsSelected] = useState(false);
  const bgVariant: string = "";

  const { choose } = useContext(TournamentContext)

  return (
    <div className={toClassString(["bg-green-200 mb-32 rounded-md p-6"])}>
      {selectors.map((selector) => {
        return (
          <SelectorButton
            key={selector}
            icon={selector}
            onClick={() => {
              setIsSelected(true)
              choose(selector)
            }}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

export default Selector;
