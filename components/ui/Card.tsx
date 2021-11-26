import { FC } from "react";
import { toClassString } from "@utils/formater";
import { ThemeVariantType } from "@/types/styles";

export interface CardProps {
  size?: "small" | "medium" | "large";
  theme: "success" | "warning" | "info" | "danger";
  onClick?: () => void;
  className?: string;
  children: any;
}

export const Card: FC<CardProps> = ({
  size = "medium",
  theme = "success",
  children,
  className = "",
  ...props
}) => {
  const bgVariant: ThemeVariantType = {
    success: "bg-green-300",
    warning: "bg-yellow-300",
    info: "bg-blue-300",
    danger: "bg-red-200",
    none: "",
  };
  const borderVariant: ThemeVariantType = {
    success: "border-green-400",
    warning: "border-yellow-400",
    info: "border-blue-400",
    danger: "border-red-300",
    none: "border-none",
  };

  return (
    <div
      className={toClassString([
        "border-2 rounded-lg p-4",
        bgVariant[theme],
        borderVariant[theme],
        className,
      ])}
    >
      {children}
    </div>
  );
};

export default Card;
