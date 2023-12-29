import { gql } from "@apollo/client/core";

export const GET_PRODUCT = gql`
  query GetProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      aggregations(filter: {}) {
        attribute_code
        count
        label
        options {
          label
          value
        }
        position
      }
      items {
        id
        name
        sku
        price {
            regularPrice {
                amount {
                value
                currency
                }
            }
        }
        review_count
        reviews {
          items {
            average_rating
            ratings_breakdown {
              value
            }
          }
        }
        media_gallery {
          label
          url
        }
      }
    }
    currency {
      base_currency_symbol
    }
  }
`;

export const GET_CURRENCY = gql`
  query GetCurrency {
    currency {
      base_currency_symbol
    }
  }
`;
