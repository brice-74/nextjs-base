import { gql } from "graphql-request";

import { getClient } from "@data/graphql";
import { UserAccount } from "@types";

const registerUserQuery = gql`
  mutation registerUserAccount($input: RegisterUserAccountInput!) {
    registerUserAccount(input: $input) {
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
`;

function registerUserAccount({ input }: RegisterUserAccountParams) {
  return getClient().request<RegisterUserAccountResponse>(registerUserQuery, {
    input: {
      ...input,
    },
  });
}

type RegisterUserAccountInput = {
  email: string
  password: string
  profilName: string
};

type RegisterUserAccountParams = {
  input: RegisterUserAccountInput
}

type RegisterUserAccountResponse = {
  registerUserAccount: UserAccount
};

export { registerUserAccount }