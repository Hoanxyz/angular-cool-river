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
        description {
          html
        }
        delivery_returns
        specifications
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

export const GET_CART_EMPTY_ID = gql `
  mutation {
    createEmptyCart
  }
`

export const ADD_TO_CART = gql`
  mutation($cartId: String!, $cartItems: [CartItemInput!]!) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        id
        items {
          id
          product {
            sku
            name
          }
          quantity
        }
      }
    }
  }
`

export const ADD_CONFIG_TO_CART = gql`
  mutation AddToCart($cartId: String!, $cartItems: [CartItemInput!]!) {
    addConfigurableProductsToCart(
      input: {
        cart_id: $cartId,
        cart_items: $cartItems
      }
    ) {
      cart {
        items {
          uid
          quantity
          product {
            name
            sku
          }
          ... on ConfigurableCartItem {
            configurable_options {
              option_label
            }
          }
        }
      }
    }
  }
`