import * as React from "react";
import { useId } from "@reach/auto-id";
import clsx from "clsx";

import { Input, InputProps } from "./input";
import { Label } from "./label";

type FieldProps = {
  defaultValue?: string | null;
  name: string;
  label: string;
  className?: string;
  inputClassName?: string;
  error?: string;
} & InputProps;

const Field = React.forwardRef<HTMLInputElement, FieldProps>(function Field(
  { defaultValue, error, name, label, className, id, inputClassName, ...rest },
  ref
) {
  const prefix = useId();
  const inputId = id ?? `${prefix}-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className={clsx("flex flex-col mb-3", className)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        // @ts-expect-error
        ref={ref}
        {...(rest as InputProps)}
        name={name}
        id={inputId}
        defaultValue={defaultValue}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName}
        hasError={typeof error !== "undefined"}
      />
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
});

interface FieldErrorProps {
  id: string;
  children?: string | null;
}

function FieldError({ children, id }: FieldErrorProps) {
  if (!children) {
    return null;
  }

  return (
    <p
      className="text-th-danger"
      id={id}
    >
      {children}
    </p>
  );
}

export { Field };
