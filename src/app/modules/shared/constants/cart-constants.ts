import gql from 'graphql-tag';

export const GET_CART_QUERY = gql`
query GetCart($cartId: String!) {
  cart(cart_id: $cartId) {
    applied_coupons {
      code
    }
    available_payment_methods {
      code
      title
    }
   
    email
    gift_message {
      from
      message
      to
    }
    id
    is_virtual
    items {
      uid
      prices {
        discounts {
          label
          amount {
            currency
            value
          }
        }
        row_total {
          currency
          value
        }
        row_total_including_tax {
          currency
          value
        }
        total_item_discount {
          currency
          value
        }
      }
      product {
        uid
        name
        sku
        url_key
        url_suffix
        only_x_left_in_stock
        image {
          url
          label
        }
      }
      quantity
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
        customizable_options {
          customizable_option_uid
          is_required
          label
          sort_order
          type
        }
      }
      ... on SimpleCartItem {
        customizable_options {
          customizable_option_uid
          is_required
          label
          sort_order
          type
        }
      }
    }
    prices {
      discounts {
        label
        amount {
          currency
          value
        }
      }
      grand_total{
        currency
        value
      }
      subtotal_excluding_tax{
        currency
        value
      }
      subtotal_including_tax{
        currency
        value
      }
      subtotal_with_discount_excluding_tax{
        currency
        value
      }
      applied_taxes {
        label
        amount {
          currency
          value
        }
      }
    }
    selected_payment_method {
      code
      purchase_order_number
      title
    }
    total_quantity
  }
}
`;
export const MUTATION_UPDATE_CART = gql`
mutation UpdateCartItems($cartId: String!, $cartItems: [CartItemUpdateInput!]!) {
  updateCartItems(input: {
    cart_id: $cartId,
    cart_items: $cartItems
  }) {
    cart {
      applied_coupons {
      code
    }
    available_payment_methods {
      code
      title
    }
   
    email
    gift_message {
      from
      message
      to
    }
    id
    is_virtual
    items {
      uid
      prices {
        discounts {
          label
          amount {
            currency
            value
          }
        }
        row_total {
          currency
          value
        }
        row_total_including_tax {
          currency
          value
        }
        total_item_discount {
          currency
          value
        }
      }
      product {
        uid
        name
        sku
        url_key
        image {
          url
          label
        }
      }
      quantity
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
        customizable_options {
          customizable_option_uid
          is_required
          label
          sort_order
          type
        }
      }
      ... on SimpleCartItem {
        customizable_options {
          customizable_option_uid
          is_required
          label
          sort_order
          type
        }
      }
    }
    prices {
      discounts {
        label
        amount {
          currency
          value
        }
      }
      grand_total{
        currency
        value
      }
      subtotal_excluding_tax{
          currency
          value
        }
      subtotal_including_tax{
          currency
          value
        }
      subtotal_with_discount_excluding_tax{
          currency
          value
        }
    }
    selected_payment_method {
      code
      purchase_order_number
      title
    }
    total_quantity
    }
  }
}
`;

export const MUTATION_APPLY_COUPON_CART = gql`
  mutation ApplyCouponToCart($cartId: String!, $couponCode: String!) {
    applyCouponToCart(input: { cart_id: $cartId, coupon_code: $couponCode }) {
      cart {
        applied_coupons {
          code
        }
        email
        gift_message {
          from
          message
          to
        }
        id
        is_virtual
        items {
          uid
          prices {
            discounts {
              label
              amount {
                currency
                value
              }
            }
            row_total {
              currency
              value
            }
            row_total_including_tax {
              currency
              value
            }
            total_item_discount {
              currency
              value
            }
          }
          product {
            uid
            name
            sku
            url_key
            only_x_left_in_stock
            image {
              url
              label
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              option_label
              value_label
            }
            customizable_options {
              customizable_option_uid
              is_required
              label
              sort_order
              type
            }
          }
          ... on SimpleCartItem {
            customizable_options {
              customizable_option_uid
              is_required
              label
              sort_order
              type
            }
          }
        }
        prices {
          discounts {
            label
            amount {
              currency
              value
            }
          }
          grand_total {
            currency
            value
          }
          subtotal_excluding_tax {
            currency
            value
          }
          subtotal_including_tax {
            currency
            value
          }
          subtotal_with_discount_excluding_tax {
            currency
            value
          }
          applied_taxes {
            label
            amount {
              currency
              value
            }
          }
        }
        selected_payment_method {
          code
          purchase_order_number
          title
        }
        shipping_addresses {
          street
          city
          region {
            code
            label
          }
          postcode
          country {
            code
            label
          }
        }
        total_quantity
      }
    }
  }
`;
export const MUTATION_REMOVE_COUPON_CART = gql`
  mutation Removecouponfromcart($cartId: String!) {
    removeCouponFromCart(input: { cart_id: $cartId }) {
      cart {
        applied_coupons {
          code
        }
        email
        gift_message {
          from
          message
          to
        }
        id
        is_virtual
        items {
          uid
          prices {
            discounts {
              label
              amount {
                currency
                value
              }
            }
            row_total {
              currency
              value
            }
            row_total_including_tax {
              currency
              value
            }
            total_item_discount {
              currency
              value
            }
          }
          product {
            uid
            name
            sku
            url_key
            url_suffix
            image {
              url
              label
            }
          }
          quantity
          ... on ConfigurableCartItem {
            configurable_options {
              option_label
              value_label
            }
            customizable_options {
              customizable_option_uid
              is_required
              label
              sort_order
              type
            }
          }
          ... on SimpleCartItem {
            customizable_options {
              customizable_option_uid
              is_required
              label
              sort_order
              type
            }
          }
        }
        prices {
          discounts {
            label
            amount {
              currency
              value
            }
          }
          grand_total {
            currency
            value
          }
          subtotal_excluding_tax {
            currency
            value
          }
          subtotal_including_tax {
            currency
            value
          }
          subtotal_with_discount_excluding_tax {
            currency
            value
          }
          applied_taxes {
            label
            amount {
              currency
              value
            }
          }
        }
        selected_payment_method {
          code
          purchase_order_number
          title
        }
        shipping_addresses {
          street
          city
          region {
            code
            label
          }
          postcode
          country {
            code
            label
          }
        }
        total_quantity
      }
    }
  }
`;