import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_CURRENCY, GET_PRODUCT } from 'src/app/modules/services/product.service';
import { Product } from 'src/app/modules/shared/interface/product.interface';
import { ProductData } from 'src/app/modules/shared/interface/productdata.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent {
  sku: string = '';
  attribute: { [name: string]: any } = {};

  currency: ProductData = {
    products: {
      attribute_code: '',
      count: 0,
      label: '',
      options: {
        label: '',
        value: ''
      },
      position: 0,
      items: []
    },
    currency: {
      base_currency_symbol: ''
    }
  };

  product: Product = {
    name: '',
    price: { regularPrice: { amount: { value: 0, currency: '' } } },
    review_count: 0,
    reviews: { items: [{ average_rating: '', ratings_breakdown: [{ value: 0 }] }] },
    media_gallery: [{ label: '', url: '' }],
    id: '',
    sku: '',
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
          const products = rep.data.products;

          if (rep.data.products.items.length === 0) {
            this.router.navigateByUrl('/404', { skipLocationChange: true });
          } else {
            this.product = rep.data.products.items[0];
            this.currency = rep.data.currency.base_currency_symbol;

            const aggregations = products.aggregations || [];

            aggregations.forEach((value: any) => {
              this.attribute['label'] = value.label;
            });
            if (this.attribute.hasOwnProperty("Category")) {
              delete this.attribute['Category'];
            }
          }
        }
      ),
    );
  }
}
