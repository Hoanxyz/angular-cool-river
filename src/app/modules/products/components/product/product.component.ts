import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_CURRENCY, GET_PRODUCT } from 'src/app/modules/services/product.service';
import { Product } from 'src/app/modules/shared/interface/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent {
  sku: string = '';
  currency: string = '';
  gallery: { [src: string]: any } = {};

  product: Product = {
    name: '',
    price: { regularPrice: { amount: { value: 0, currency: '' } } },
    review_count: 0,
    reviews: { items: [{ average_rating: '', ratings_breakdown: [{ value: 0 }] }] },
    media_gallery: [{ label: '', url: '' }],
    id: '',
    sku: ''
  };

  private subscriptions: Subscription[] = [];
  
  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) {
    this.route.params.subscribe((params) => {
      this.sku = params['sku'];
    });
    // Product
    this.subscriptions.push(
      this.apollo.watchQuery<any>({
        query: GET_PRODUCT,
        variables: {
          sku: this.sku,
        },
      }).valueChanges.subscribe(
        (rep) => {
          if (rep.data.products.items.length === 0) {
            this.router.navigateByUrl('/404', { skipLocationChange: true });
          } else {
            this.product = rep.data.products.items[0];
            console.log(this.product.media_gallery);
          }
        }
      ),
    );

    // Currency
    this.subscriptions.push(
      this.apollo.watchQuery<any>({ query: GET_CURRENCY }).valueChanges.subscribe(
        (rep) => {
          
          this.currency = rep.data.currency.base_currency_symbol;
          console.log(this.currency);

        }
      ),
    );
  }
}
