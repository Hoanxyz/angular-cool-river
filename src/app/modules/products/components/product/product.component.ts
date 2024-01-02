import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { IListItemClickEventArgs, ISlideEventArgs, IgxCarouselComponent, IgxListComponent } from 'igniteui-angular';
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
export class ProductComponent implements OnInit {
  sku: string = '';
  attribute: { [name: string]: any } = {};
  @ViewChild(IgxCarouselComponent, { static: true })
  carousel!: IgxCarouselComponent;

  @ViewChild(IgxListComponent, { static: true })
  list!: IgxListComponent;

  slides: any[] = [];
  currentIndex = 0;

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
            
            this.attribute['label'] = this.attribute['label'] || [];

            aggregations.forEach((value: any) => {
              this.attribute['label'].push({
                label: value.label,
                options: value.options
              });            
            });
            this.attribute['label'].shift();
            console.log(this.attribute['label']);            
          }
        }
      ),
    );
  }
  public ngOnInit() {
    // this.addSlides();

    this.list.itemClicked.subscribe((args: IListItemClickEventArgs) => {
        this.currentIndex = args.item.index;
        this.carousel.select(this.carousel.get(this.currentIndex));
    });

    this.carousel.slideChanged.subscribe((args: ISlideEventArgs) => {
        this.currentIndex = args.slide.index;
    });
  }
}
