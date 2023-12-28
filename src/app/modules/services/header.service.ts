import {gql} from "@apollo/client/core";
import { Component, Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
 
@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  searchProducts(keyword: string) {
    return this.apollo.watchQuery({
      query: gql`
        query GetProducts($keyword: String!) {
          products(search: $keyword, filter: {}, pageSize: 20, currentPage: 1, sort: {}) {
            items {
              id
              name
              sku
            }
          }
        }
      `,
      variables: {
        keyword,
      },
    }).valueChanges;
  }
}

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
  query GetProducts($keyword: String!) {
    products(
      search: $keyword
      filter: {}
      pageSize: 20
      currentPage: 1
      sort: {}
      ) {
      aggregations(filter: {}) {
          attribute_code
          label
      }
      filters {
          filter_items_count
          name
          request_var
      }
      items {
          canonical_url
          id
          name
          sku
          stock_status
          url_key
      }
      suggestions {
          search
      }
      total_count
      }
  }
`