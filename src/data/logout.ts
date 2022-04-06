import { gql } from "graphql-request"
import { useRouter } from "next/router"
import { useMutation, useQueryClient } from "react-query"
import { getClient } from "./graphql"
import { deleteFromStorage, StorageKey } from "./storage"

const logoutUserQuery = gql`
  mutation logoutUserAccount() {
    logoutUserAccount
  }
`

function logoutUserAccount() {
  return getClient().request<LogoutUserAccountResponse>(logoutUserQuery);
}

type LogoutUserAccountResponse = {
  logoutUserAccount: boolean
};

function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const mut = useMutation(
    ["logoutUserAccount"],
    async () => {
      return logoutUserAccount()
    },
    {
      onSuccess: () => {
        deleteFromStorage(StorageKey.Access)
        deleteFromStorage(StorageKey.Refresh)
        deleteFromStorage(StorageKey.Session)
      }
    }
  );

  return () => {
    mut.mutate()

    router.replace("/auth/login").then(() => queryClient.resetQueries())
  }
}

export { useLogout }