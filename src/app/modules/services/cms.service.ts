import {gql} from "@apollo/client/core";

export const GET_CONTENT_NEWSLETER = gql `
  query GetConTentNewsletter {
    cmsBlocks(identifiers: "newsletter") {
      items {
        content
      }
    }
  }
`

export const GET_CONTENT_FOOTER_BOTTOM = gql `
  query GetConTentFooter {
    cmsBlocks(identifiers: "footer") {
      items {
        content
      }
    }
  }
`

export const SUBSCRIBE_EMAIL_NEWSLETTER = gql `
mutation SubscribeEmailToNewsletter(
    $email: String!
  ) {
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`
