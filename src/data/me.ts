import { Role, RoleObj, UserAccount } from "@types"
import { gql } from "graphql-request"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { useQuery, useQueryClient } from "react-query"
import { getClient } from "./graphql"
import { useRefresh } from "./refresh"
import { deleteFromStorage, getFromStorage, StorageKey } from "./storage"

const meQuery = gql`
  {
    me {
      id
      createdAt
      updatedAt
      active
      email
      password
      roles
      profilName
      shortId
    }
  }
`

async function getMe() {
  const token = getFromStorage(StorageKey.Access)

  if (token === null) {
    return null
  }

  return getClient().request<GetMeResponse>(meQuery)
}

type GetMeResponse = {
  me: UserAccount
}

function useMe() {
  const logout = useLogout()
  const { mut: refreshMut, mutErr: gqlErr } = useRefresh()

  const { data } = useQuery("me", getMe, {
    retry: false,
    keepPreviousData: true,
    onError: gqlErr.handle
  })

  useEffect(() => {
    if (gqlErr.message !== undefined) {
      if (gqlErr.message === "Token is expired") {
        refreshMut.mutate(getFromStorage(StorageKey.Refresh) ?? "")
        return 
      }
      logout()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gqlErr.message])

  const user = data?.me ?? null

  const can = useCallback((role: Role | Role[]) => {
    if (user === null) {
      if (role === RoleObj.ROLE_ANONYMOUS) {
        return true
      }

      return false
    }

    if (!Array.isArray(role)) {
      return user.roles.some((r) => r === role)
    }

    return role.every((r) => user.roles.includes(r))
  }, [user])

  return { me: user, can }
}

function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return () => {
    deleteFromStorage(StorageKey.Access)
    deleteFromStorage(StorageKey.Refresh)
    deleteFromStorage(StorageKey.Session)

    router.replace("/auth/login").then(() => queryClient.resetQueries())
  }
}

export { useMe, useLogout }