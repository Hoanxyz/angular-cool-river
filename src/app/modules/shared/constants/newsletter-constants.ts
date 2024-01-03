import {gql} from "@apollo/client/core";

export const SUBSCRIBE_EMAIL_NEWSLETTER = gql `
mutation SubscribeEmailToNewsletter(
    $email: String!
  ) {
    subscribeEmailToNewsletter(email: $email) {
      status
    }
  }
`