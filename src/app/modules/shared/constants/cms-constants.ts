import {gql} from "@apollo/client/core";

export const GET_CONTENT_CMS_BLOCK = gql `
  query GetConTentCmsById($blockId: [String]!) {
    cmsBlocks(identifiers: $blockId) {
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
