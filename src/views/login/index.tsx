import { useMe } from "@data/me";
import { useLogin } from "@data/login";
import { RoleObj } from "@types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Form } from "./form";

function Login() {
  const { can } = useMe()
  const router = useRouter()

  useEffect(() => {
    !can(RoleObj.ROLE_ANONYMOUS) ? router.replace("/") : null
  }, [can, router])

  const { mut, mutErr } = useLogin({redirectTo: "/"})

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
