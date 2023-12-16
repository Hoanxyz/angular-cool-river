import {gql} from "@apollo/client/core";

export const GENERATE_CUSTOMER_TOKEN = gql`
  mutation GenerateCustomerToken(
    $email: String!
    $password: String!
  ) {
    generateCustomerToken(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;
