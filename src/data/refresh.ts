import { Tokens } from "@types";
import { useGQLErrorHandling } from "@utils/graphql";
import { gql } from "graphql-request";
import { useMutation, useQueryClient } from "react-query";
import { getClient } from "./graphql";
import { saveInStorage, StorageKey } from "./storage";

const refreshUserQuery = gql`
  mutation refreshUserAccount(
    $token: String!
  ) {
    refreshUserAccount(
      token: $token
    ) {
      access
      refresh
    }
  }
`;

function refreshUserAccount(token: string) {
  return getClient(false).request<RefreshUserAccountResponse>(refreshUserQuery, {token});
}

function useRefresh() {
  const queryClient = useQueryClient()
  const mutErr = useGQLErrorHandling()

  const mut = useMutation(
    async (token: string) => {
      return refreshUserAccount(token)
    },
    {
      onError: mutErr.handle,
      onSuccess: (data) => {
        saveInStorage(StorageKey.Access, data.refreshUserAccount.access)
        saveInStorage(StorageKey.Refresh, data.refreshUserAccount.refresh)

        queryClient.resetQueries()
      }
    }
  )

  return { mut, mutErr }
}

type RefreshUserAccountResponse = {
  refreshUserAccount: Tokens
};

export { useRefresh }