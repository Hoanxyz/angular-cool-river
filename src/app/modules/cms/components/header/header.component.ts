import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { CmsService } from 'src/app/modules/shared/services/cms.service';
import { StoreConfigService } from 'src/app/modules/shared/services/store-config.service';
import { CategoryService } from 'src/app/modules/shared/services/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnDestroy {
  isLogged = false;
  customer: any;
  loading = true;
  topHeaderBlockId: string = 'header-top-bar';
  contactBlockId: string = 'header-contact';
  conTentTopHeader: string = '';
  baseUrl: string = '';
  logoSrc: string = '';
  conTentContact: string = '';
  categories: { [name: string]: any } = {};
  searchControl = new FormControl('');
  searchResults: any[] = [];
  private subscriptions: Subscription[] = [];

  constructor (
    private router: Router, 
    private cmsService: CmsService,
    private storeConfigService: StoreConfigService,
    private categoryService: CategoryService
  ) {
    this.subscriptions.push(
      this.cmsService.getBlockContent(this.topHeaderBlockId)
        .valueChanges.subscribe(
          (rep) => {
            this.conTentTopHeader = rep.data.cmsBlocks.items[0].content
          }
        ),
    this.cmsService.getBlockContent(this.contactBlockId)
      .valueChanges.subscribe(
        (rep) => {          
          this.conTentContact = rep.data.cmsBlocks.items[0].content
        }
      ),
    this.storeConfigService.getLogo()
      .valueChanges.subscribe(
        (rep) => {
          this.baseUrl = rep.data.storeConfig.base_url;
          this.logoSrc = rep.data.storeConfig.header_logo_src;
        }
      ),
    this.categoryService.getCategoriesName()
    .valueChanges.subscribe(
      (rep) => {
        if (rep.data && rep.data.categoryList) {
          rep.data.categoryList.forEach((value) => {
            this.categories[value.name] = value;
          });
        }
      }
    )
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
