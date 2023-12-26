import {gql} from "@apollo/client/core";
import { Component } from "@angular/core";
 
// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css'],
// })

export const GET_HEADER_TOP = gql `
  query GetHeaderTop {
    cmsBlocks(identifiers: ["header-top-bar"]) {
      items {
        content
        identifier
        title
      }
    }
  }
`
export const GET_LOGO = gql `
  query GetLogo {
    storeConfig {
      base_url
      header_logo_src
    }
  }
`
 
export const GET_CONTACT = gql `
  query GetContact {
    cmsBlocks(identifiers: ["header-contact"]) {
      items {
        content
        identifier
        title
      }
    }
  }
`

export const GET_CATEGORIES = gql `
  query GetCategories {
    categoryList(filters: { parent_id : { eq: 2 } }) {
        id
        name
        url_key
      }
  }
`

export const GET_SEARCH_QUERY = gql `
  query GetUrlAccount {
    products(
    search: "string"
    filter: {}
    pageSize: 20
    currentPage: 1
    sort: {}
    ) {
    aggregations(filter: {}) {
        attribute_code
        count
        label
        position
    }
    filters {
        filter_items_count
        name
        request_var
    }
    items {
        attribute_set_id
        canonical_url
        color
        colour
        country_of_manufacture
        created_at
        delivery_returns
        gift_message_available
        id
        meta_description
        meta_keyword
        meta_title
        name
        new_from_date
        new_to_date
        only_x_left_in_stock
        options_container
        review_count
        size
        sku
        special_from_date
        special_price
        special_to_date
        specifications
        stock_status
        swatch_image
        type_id
        uid
        updated_at
        url_key
        url_path
        url_suffix
    }
    page_info {
        current_page
        page_size
        total_pages
    }
    sort_fields {
        default
    }
    suggestions {
        search
    }
    total_count
    }
  }
`