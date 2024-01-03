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

export const GET_BLOCK_PRODUCT = gql `
  query GetProductBlock {
    cmsBlocks(identifiers: ["product_block"]) {
      items {
        content
        identifier
        title
      }
    }
  }
`