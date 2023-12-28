import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_CURRENCY, GET_PRODUCT } from 'src/app/modules/services/product.service';
import { Product } from 'src/app/modules/shared/interface/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  sku: string = '';
  currency: string = '';
  product: Product = { name: '', price: { regularPrice: { amount: { value: 0 } } }, review_count: 0, reviews: { items: [{ average_rating: '' }] } };
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
          console.log(rep.data);
          this.product = rep.data.products.items[0];
        }
      ),
    );

    // Currency
    this.subscriptions.push(
      this.apollo.watchQuery<any>({ query: GET_CURRENCY }).valueChanges.subscribe(
        (rep) => {
          
          this.currency = rep.data.currency.base_currency_symbol;
        }
      ),
    );
  }
}
