// search.component.ts
import { Component } from '@angular/core';
import { SearchService } from 'src/app/modules/services/search.service';
import { Apollo } from 'apollo-angular';
import { GET_SEARCH_QUERY } from 'src/app/modules/services/header.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent {
  searchKeyword: string = '';

  constructor(private searchService: SearchService, private apollo: Apollo) {
    this.watchSearchQuery();
  }

  private watchSearchQuery() {
    this.apollo.watchQuery<any>({
      query: GET_SEARCH_QUERY,
      variables: { keyword: this.searchKeyword },
    }).valueChanges.subscribe(
      (rep) => {
      }
    );
  }
}