import * as React from "react";
import clsx from "clsx";

type InputProps = (
  | ({ type: "textarea" } & JSX.IntrinsicElements["textarea"])
  | JSX.IntrinsicElements["input"]
) & {
  hasError?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { hasError = false, ...props },
  ref
) {
  const className = clsx(
    "outline-none p-3 rounded-[10px]",
    hasError
      ? "border border-th-danger"
      : null,
    props.className
  );

  if (props.type === "textarea") {
    return (
      <textarea
        {...(props as JSX.IntrinsicElements["textarea"])}
        className={className}
      />
    );
  }

  return (
    <input
      {...(props as JSX.IntrinsicElements["input"])}
      className={className}
      ref={ref}
    />
  );
});

export { Input };
export type { InputProps };
