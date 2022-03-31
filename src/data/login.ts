import { Tokens } from "@types";
import { useGQLErrorHandling } from "@utils/graphql";
import { FormData } from "@views/login/form";
import { gql } from "graphql-request";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import { getClient } from "./graphql";
import { getOrCreateSession, saveInStorage, StorageKey } from "./storage";

const loginUserQuery = gql`
  mutation loginUserAccount(
    $email: String!
    $password: String!
    $sessionID: ID!
  ) {
    loginUserAccount(
      email: $email
      password: $password
      sessionID: $sessionID
    ) {
      access
      refresh
    }
  }
`;

function loginUserAccount({ email, password, sessionID }: LoginUserAccountParams) {
  return getClient().request<LoginUserAccountResponse>(loginUserQuery, {
    email,
    password, 
    sessionID
  });
}

type LoginUserAccountParams = {
  email: string
  password: string
  sessionID: string
}

type LoginUserAccountResponse = {
  loginUserAccount: Tokens
};

function useLogin({redirectTo}: {redirectTo: string}) {
  const queryClient = useQueryClient()
  const mutErr = useGQLErrorHandling()
  const router = useRouter()

  const mut = useMutation(
    async (data: FormData) => {
      return loginUserAccount({
        email: data.email,
        password: data.password,
        sessionID: getOrCreateSession(),
      })
    },
    {
      onError: mutErr.handle,
      onSuccess: (data) => {
        saveInStorage(StorageKey.Access, data.loginUserAccount.access)
        saveInStorage(StorageKey.Refresh, data.loginUserAccount.refresh)
        
        router.replace(redirectTo).then(() => queryClient.resetQueries())
      }
    }
  );

  return { mut, mutErr }
}

export { loginUserAccount, useLogin }