import {gql} from "@apollo/client/core";

export const GET_CONTENT_HOME = gql `
  query GetConTentHome {
    cmsPage(identifier: "home") {
      identifier
      content
    }
  }
`

export const GET_STORE_CONFIG_HOME = gql `
  query GetStoreConfigHome {
    storeConfig {
      cms_home_page
    }
  }
`