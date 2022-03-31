import { GraphQLClient } from "graphql-request";
import { config } from "@config";
import { getFromStorage, StorageKey } from "./storage";

function getClient(useAccess = true): GraphQLClient {
  const headers: HeadersInit = {}

  if (useAccess) {
    const token = getFromStorage(StorageKey.Access)
    if (token !== null) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  return new GraphQLClient(config.api.graphql, { headers })
}

export { getClient }