const endpoint = process.env.NEXT_PUBLIC_REST_API_ENDPOINT

export const config = {
  api: {
    rest: endpoint ?? "",
    graphql: endpoint + "/graphql" ?? "",
  },
};