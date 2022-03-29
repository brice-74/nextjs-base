import clsx from "clsx";
import * as React from "react";

function Label({ className, ...labelProps }: JSX.IntrinsicElements["label"]) {
  return (
    <label
      {...labelProps}
      className={clsx("text-th-dark-1 mb-1", className)}
    />
  );
}

export { Label };