import {gql} from "@apollo/client/core";

export const GET_CATEGORIES_LIST = gql `
  query GetCategories {
    categoryList(filters: { parent_id : { eq: 2 } }) {
        id
        name
        url_key
      }
  }
`