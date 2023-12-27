import { gql } from "@apollo/client/core";

export const GET_PRODUCT = gql`
  query GetProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
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
      }
    }
  }
`;

export const GET_CURRENCY = gql`
  query GetCurrency {
    currency {
        available_currency_codes
        base_currency_code
        base_currency_symbol
        default_display_currecy_code
        default_display_currecy_symbol
        default_display_currency_code
        default_display_currency_symbol
        exchange_rates {
          currency_to
          rate
        }
      }
  }
`;
