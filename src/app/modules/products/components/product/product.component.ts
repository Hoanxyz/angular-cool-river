import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { GET_PRODUCT } from 'src/app/modules/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  sku: string = '';
  nameProduct: string = '';
  price!: number;
  private subscriptions: Subscription[] = [];
  
  constructor(private route: ActivatedRoute, private apollo: Apollo, private router: Router) {
    this.route.params.subscribe((params) => {
      this.sku = params['sku'];
    });
    this.subscriptions.push(
      this.apollo.watchQuery<any>({
        query: GET_PRODUCT,
        variables: {
          sku: this.sku,
        },
      }).valueChanges.subscribe(
        (rep) => {
          this.nameProduct = rep.data.products.items[0].name;
          this.price = rep.data.products.items[0].price.regularPrice.amount.value.toFixed(2);
        }
      ),
    );
  }
}
