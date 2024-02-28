import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  show?: boolean | undefined;
  disabled?: boolean | undefined;
  type?: "button" | "reset" | "submit" | undefined;
}

function Button({
  text,
  className,
  onClick,
  // name,
  type,
  show,
  disabled,
  ...buttonProps
}: ButtonProps) {
  const classes = twMerge(
    "bg-[#0B1F3F] h-[58px] font-bold rounded-[10px] text-white  text-center",
    className
  );
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...buttonProps}
      className={classes}
    >
      <div className="flex w-full justify-center items-center flex-row ">
        <div className="text-center font-normal font-euclid text-base  ">
          {text}
        </div>
        <div className="ml-2 flex  items-center">
          {show && (
            <svg
              className="animate-spin h-5 w-5 border-4 rounded-full  border-t-brand-200 border-l-brand-200 border-r-brand-200 "
              viewBox="0 0 24 24"
            ></svg>
          )}
        </div>
      </div>
    </button>
  );
}

export { Button };
