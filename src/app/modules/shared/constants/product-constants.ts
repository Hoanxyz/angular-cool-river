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
  mutation($cartId: String!, $cartItems: [ProductCart!]!) {
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
mutation {
  addConfigurableProductsToCart(
    input: {
      cart_id: "enCHisNlvHfqcIWzxXhVCgrMMmo9v7Rf"
      cart_items: 
        {
            parent_sku: "laptop-1"
          data: {
            quantity: 2
            sku: "Ideapad 120S-KH 11.6 Inch Laptop-Pink-11 inch"
          }
        }
      
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
      }
    }
  }
}
`