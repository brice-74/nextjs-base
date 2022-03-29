import { useLogin } from "@data/login";
import { registerUserAccount } from "@data/register";
import { useMutation } from "react-query";
import { Form, FormData } from "./form";

function Register() {
  const {mut: loginMut, mutErr} = useLogin({redirectTo: "/"})
  let passwordInput:string

  const mut = useMutation(
    async (data: FormData) => {
      passwordInput = data.password
      return registerUserAccount({
        input: {...data},
      });
    },
    {
      onError: mutErr.handle,
      onSuccess: (data) => {
        loginMut.mutate({
          email: data.registerUserAccount.email,
          password: passwordInput
        })
      }
    }
  );

  const loading = mut.isLoading || loginMut.isLoading
  const error = mut.isError || loginMut.isError

  return (
    <div className="min-w-[80%] bg-th-light-1-op p-8 rounded-[10px] m-auto backdrop-blur drop-shadow-xl">
      <Form 
        onSubmit={mut.mutate}
        loading={loading}
        error={error}
        errorMessage={mutErr.message}
      />
    </div>
  );
}

export { Register };