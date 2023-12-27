import {gql} from "@apollo/client/core";

export const GET_PRODUCT = gql `
  query GetConTentNewsletter {
    products(
        filter: {}
      ) {
        items {
          name
        }
      }
  }
`