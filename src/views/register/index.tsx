import { registerUserAccount } from "@data/register";
import { useMutationErrorHandling } from "@utils/graphql";
import { useMutation } from "react-query";
import { Form, FormData } from "./form";

function Register() {

  const mutErr = useMutationErrorHandling()

  const mut = useMutation(
    async (data: FormData) => {
      return registerUserAccount({
        input: {...data},
      });
    },
    {
      onError: mutErr.handle
    }
  );

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

export { Register };