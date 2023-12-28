import { gql } from '@apollo/client/core';

export const GENERATE_CUSTOMER_TOKEN = gql`
  mutation GenerateCustomerToken($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`;

export const GENERATE_CUSTOMER_ORDER = gql`
  query getCustomerOrder {
    customer {
      is_subscribed
      email
      firstname
      is_subscribed
      lastname
      middlename
      orders(filter: {}, currentPage: 1, pageSize: 20) {
        items {
          shipping_address {
            firstname
            lastname
            middlename
          }
          number
          order_date
          status
          total {
            grand_total {
              value
              currency
            }
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
        total_count
      }
    }
    currency {
      base_currency_code
      base_currency_symbol
    }
    customerOrders {
      items {
        id
        order_number
      }
    }
  }
`;

export const REORDER = gql`
  mutation ReorderItems($orderNumber: String!){
   reorderItems(orderNumber: $orderNumber) {
    cart {
      billing_address {
        lastname
      }
      email
      id
      is_virtual
      items {
        uid
      }
      prices{
        grand_total{
          value
        }
      }
      selected_payment_method {
        code
        purchase_order_number
        title
      }
      shipping_addresses {
        lastname
      }
      total_quantity
    }
    userInputErrors {
      code
      message
      path
    }
  }
}
`

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $is_subscribed: Boolean!
  ) {
    createCustomer(
      input: {
        firstname: $firstname
        lastname: $lastname
        email: $email
        password: $password
        is_subscribed: $is_subscribed
      }
    ) {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`;

export const GET_CUSTOMER_DETAILS = gql`
  query GetCustomerDetails {
    customer {
      created_at
      date_of_birth
      default_billing
      default_shipping
      dob
      email
      firstname
      gender
      group_id
      id
      is_subscribed
      lastname
      middlename
    }
  }
`;
