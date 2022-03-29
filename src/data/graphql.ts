import { GraphQLClient } from "graphql-request";
import { config } from "@config";

function getClient(): GraphQLClient {
  const headers: HeadersInit = {};

  return new GraphQLClient(config.api.graphql, { headers });
}

export { getClient };