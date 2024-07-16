import clsx from "clsx";
import React from "react";

interface Iprops {
  children: any;
  className?: string;
}

export function Label({ children, className }: Iprops) {
  return (
    <label
      htmlFor={children}
      className={clsx(className, "form-label floating-label")}
    >
      {children}
    </label>
  );
}