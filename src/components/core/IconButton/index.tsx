import { classNames } from "@/helpers/classNames";
import { FCC } from "@/helpers/FCC";
import React from "react";

type buttonDefaultProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  bordered?: boolean;
};

const IconButton: FCC<buttonDefaultProps> = ({
  children,
  className,
  bordered = false,
  ...rest
}) => {
  return (
    <button
      className={classNames(
        "hover:text-black rounded focus:text-black",
        bordered
          ? "border hover:border-black focus:border-black"
          : "outline-none focus:ring-2",
        className && className
      )}
      {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
