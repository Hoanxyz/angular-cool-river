import { Component, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { GET_CATEGORIES, GET_CONTACT, GET_HEADER_TOP, GET_LOGO, GET_SEARCH_QUERY } from 'src/app/modules/services/header.service';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  isLogged = false;
  customer: any;
  loading = true;
  conTentTopHeader: string = '';
  baseUrl: string = '';
  logoSrc: string = '';
  conTentContact: string = '';
  categories: { [name: string]: any } = {};
  searchControl = new FormControl('');
  searchResults: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private apollo: Apollo, private router: Router) {
    this.subscriptions.push(
      this.apollo.watchQuery<any>({ query: GET_HEADER_TOP }).valueChanges.subscribe(
        (rep) => {
          this.conTentTopHeader = rep.data.cmsBlocks.items[0].content;
        }
      ),
      this.apollo.watchQuery<any>({ query: GET_LOGO }).valueChanges.subscribe(
        (rep) => {
          this.baseUrl = rep.data.storeConfig.base_url;
          this.logoSrc = rep.data.storeConfig.header_logo_src;
        }
      ),
      this.apollo.watchQuery<any>({ query: GET_CONTACT }).valueChanges.subscribe(
        (rep) => {
          this.conTentContact = rep.data.cmsBlocks.items[0].content;
        }
      ),
      this.apollo.watchQuery<any>({ query: GET_CATEGORIES }).valueChanges.subscribe(
        (rep) => {
          if (rep.data && rep.data.categoryList) {
            rep.data.categoryList.forEach((value: any) => {
              this.categories[value.name] = value;
            });
          }
        }
      ),
      // this.searchControl.valueChanges.pipe(
      //   debounceTime(300),
      //   distinctUntilChanged(),
      //   switchMap((query) => this.searchProducts(query))
      // ).subscribe((results) => {
      //   this.searchResults = results;
      // })
    );
  }

  searchProducts(query: string): Observable<any[]> {
    return this.apollo.watchQuery<any>({
      query: GET_SEARCH_QUERY,
      variables: { searchQuery: query },
    }).valueChanges.pipe(
      map((result) => result.data.products.items)
    );
  }

  getCategoryNames(): string[] {
    return Object.keys(this.categories);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  logout() {
    localStorage.setItem('customer_token', '');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }
}
