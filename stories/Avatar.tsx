import React from "react";
import Image from "next/image";
import { toClassString } from "@utils/formater";
import { StyleVariantType } from "@/types/styles";

export interface AvatarProps {
  size?: "small" | "medium" | "large";
  src?: string;
  name: string;
  tagline?: string;
  active: boolean;
  onClick?: () => void;
}

const UserBadge = ({ src = "", size, active }) => {
  const sizeVariant: StyleVariantType = {
    small: "w-14 h-14",
    medium: "w-32 h-32",
    large: "w-48 h-48",
  };

  const colorVariant: string = active
    ? "bg-gray-400 border-gray-400"
    : "bg-red-400 border-red-400";

  return (
    <div
      className={toClassString([
        "border rounded-full mb-2 medium:mb-6",
        sizeVariant[size],
        colorVariant,
      ])}
    >
      <Image src={src} layout='responsive' width={1} height={1} />
    </div>
  );
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "medium",
  name = "",
  tagline,
  active = true,
  ...props
}) => {
  const bgVariant: string = active ? "bg-yellow-100" : "bg-red-300";
  const textVariant: string = active ? "text-gray-600" : "text-red-400";
  const borderVariant: string = active
    ? "border-yellow-400 "
    : "border-red-400 ";

  return (
    <div
      className={toClassString([
        "flex flex-col items-center border rounded-lg p-4",
        bgVariant,
        borderVariant,
      ])}
    >
      <UserBadge src={src} size={size} active={active} />
      <h2
        className={toClassString([
          "font-sans font-semibold text-lg",
          textVariant,
        ])}
      >
        {name}
      </h2>
      {size !== "small" && (
        <p className={toClassString(["pt-1 font-light text-sm", textVariant])}>
          {tagline}
        </p>
      )}
    </div>
  );
};
