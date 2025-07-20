import clsx from "clsx";
import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import React from "react";

type BoundedProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

export const Bounded = <T extends ElementType = "section">({
  as,
  className,
  children,
  ...restProps
}: BoundedProps<T>) => {
  const Comp = (as || "section") as ElementType;

  return (
    <>{/* 👇👇👇 This fixes the children type issue */}
      {React.createElement(
        Comp,
        {
          className: clsx("px-4 first:pt-10 md:px-6", className),
          ...restProps,
        },
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
          {children}
        </div>
      )}
    </>
  );
};
