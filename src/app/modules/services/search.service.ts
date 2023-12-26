// graphql.service.ts
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
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
