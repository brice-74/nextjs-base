import { UserSession } from "@types";
import { gql } from "graphql-request";
import { getClient } from "./graphql";

const sessionsFromAuthQuery = gql`
  query sessionsFromAuth(
    $offset: Int
    $limit: Int
    $sort: String
    $include: SessionListIncludeFiltersInput
  ) {
    sessionsFromAuth(
      offset: $offset
      limit: $limit
      sort: $sort
      include: $include
    ) {
      total
      list {
        id
        createdAt
        updatedAt
        active
        ip
        agent
        userId
      }
    }
  }
`;

function sessionsFromAuth({ 
  offset,
  limit,
  sort = "deactivatedAt",
  include = {},
}: SessionsFromAuthParams) {
  return getClient().request<SessionsFromAuthResponse>( 
    sessionsFromAuthQuery,
    {
      offset,
      limit,
      sort,
      include
    }
  )
}

type SessionsFromAuthResponse = {
  sessionsFromAuth: {
    total: number
    list: UserSession[]
  }
}

type SessionsFromAuthParams = {
  offset: number
  limit: number
  sort?: string
  include?: SessionListIncludeFiltersInput
}

type SessionListIncludeFiltersInput = {
  states?: SessionState[]
}

enum SessionState {
  ACTIVE,
  EXPIRED
}

export { sessionsFromAuth }