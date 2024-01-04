import {gql} from "@apollo/client/core";

export const GET_LOGO = gql `
  query GetLogo {
    storeConfig {
      base_url
      header_logo_src
    }
  }
`