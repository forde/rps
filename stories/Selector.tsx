import React, { useState } from "react";
import Image from "next/image";
import { toClassString } from "@utils/formater";
import { StyleVariantType } from "@/types/styles";

const selectors = ["R", "P", "S"];

export interface SelectorProps {}

export interface SelectorButtonProps {
  icon: "R" | "P" | "S";
  idx: Number;
  onClick: () => void;
}

const SelectorButton = ({ icon, idx, onClick, isSelected }) => {
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
        src={"/stories/assets" + icon + ".png"}
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

  return (
    <div className={toClassString(["bg-green-200 rounded-md p-6"])}>
      {selectors.map((selector, idx) => {
        return (
          <SelectorButton
            key={selector}
            icon={selector}
            idx={idx}
            onClick={() => setIsSelected(true)}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
};

export default Selector;
