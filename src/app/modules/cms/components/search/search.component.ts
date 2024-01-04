// search.component.ts
import { Component } from '@angular/core';
import { SearchService } from 'src/app/modules/services/search.service';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})

export class SearchComponent {
  searchKeyword: string = '';

  constructor(private searchService: SearchService, private apollo: Apollo) {
  }
}