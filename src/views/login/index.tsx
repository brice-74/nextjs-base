import { useLogin } from "@data/login";
import * as React from "react";
import { Form } from "./form";

function Login() {
  const {mut, mutErr} = useLogin({redirectTo: "/"})

  return (
    <div className="min-w-[80%] bg-th-light-1-op p-8 rounded-[10px] m-auto backdrop-blur drop-shadow-xl">
      <Form
        onSubmit={mut.mutate}
        loading={mut.isLoading}
        error={mut.isError}
        errorMessage={mutErr.message}
      />
    </div>
  );
}

export { Login };
