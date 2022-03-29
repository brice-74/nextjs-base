import * as React from "react";
import clsx from "clsx";
import Link from "next/link";
import { ChildrenProps } from "@types";

type ButtonAsButton = ChildrenProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ChildrenProps> & {
    as?: "button";
    loading?: boolean;
  };

type ButtonAsLink = ChildrenProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ChildrenProps> & {
    as: "link";
    loading?: undefined;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const ButtonShape = React.forwardRef(function ButtonShape(
  {
    className,
    children,
    loading = false,
    ...rest
  }: ButtonProps,
  ref
) {
  const classes = clsx(className);

  if (rest.as === "link") {
    return (
      <Link href={rest.href ? rest.href : "/"}>
        <a {...rest} ref={ref as any} className={classes}>
          {children}
        </a>
      </Link>
    );
  }

  const disabled = loading || rest.disabled;

  return (
    <button
      {...rest}
      ref={ref as any}
      className={clsx(classes, disabled && "opacity-50", loading)}
      disabled={disabled}
    >
      {loading ? (
        <div>
          <p>Loading...</p>
        </div>
      ) : children}
    </button>
  );
});

const Button = React.forwardRef(function Button(
  { children, className, ...rest }: ButtonProps,
  ref
) {
  return (
    <ButtonShape
      className={clsx(className)}
      ref={ref}
      {...rest}
    >
      {children}
    </ButtonShape>
  );
});

export { Button };