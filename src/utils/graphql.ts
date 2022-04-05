import { useState } from "react"

const GraphQLErrors = new Map<string, string>([
  ["Duplicate email", "Account already exist"],
  ["User not found", "Account not exist"],
  ["incorrect password", "Password or email are incorect"],
  ["Token is expired", "Token is expired"]
]);

function useGQLErrorHandling(): MutationErrorHandling {
  const [message, setMessage] = useState<string>()

  const handle = (err: MutationError) => {
    let ServerMsg: string
    if (err.response.error === undefined) {
      if (err.response.errors[0].extensions === undefined) {
        ServerMsg = err.response.errors[0].message
      } else {
        ServerMsg = err.response.errors[0].extensions.message
      }
    } else {
      ServerMsg = err.response.error
    }

    const ClientMsg = GraphQLErrors.get(ServerMsg)

    setMessage(ClientMsg ?? "Error Unexpected")
  }

  return { handle, message }
}

type MutationErrorHandling = {
  handle: (err: MutationError) => void
  message?: string
  statusCode?: number
}

type MutationError = {
  response: {
    error: undefined
    status: undefined
    errors: [
      {
        message: string
        path: string[]
        extensions: {
          code: string
          message: string
          statusCode: number
        }
      }
    ]
  }
} | {
  response: {
    errors: undefined
    error: string
    status: number
  }
}

export { useGQLErrorHandling };
export type { MutationErrorHandling }