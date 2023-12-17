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


export const CREATE_CUSTOMER = gql `
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $is_subscribed: Boolean!
  ) {
    createCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        is_subscribed: $is_subscribed
      }
    ) {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`

export const GET_CUSTOMER_DETAILS = gql `
  query GetCustomerDetails {
    customer {
      created_at
      date_of_birth
      default_billing
      default_shipping
      dob
      email
      firstname
      gender
      group_id
      id
      is_subscribed
      lastname
      middlename
    }
  }
`
