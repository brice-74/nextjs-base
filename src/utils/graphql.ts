import { useState } from "react"

const GraphQLErrors = new Map<string, string>([
  ["Duplicate email", "Account already exist"]
]);

function useMutationErrorHandling(): MutationErrorHandling {
  const [message, setMessage] = useState<string>()

  const handle = (err: MutationError) => {
    const ServerMsg = err.response.errors[0].extensions.message
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
}

export { useMutationErrorHandling };