import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { IListItemClickEventArgs, ISlideEventArgs, IgxCarouselComponent, IgxListComponent } from 'igniteui-angular';
import { Subscription } from 'rxjs';
import { GET_BLOCK_PRODUCT, GET_PRODUCT } from 'src/app/modules/services/product.service';
import { Product } from 'src/app/modules/shared/interface/product.interface';
import { ProductData } from 'src/app/modules/shared/interface/productdata.interface';
import {MDCTabBar, MDCTabBarFoundation} from '@material/tabs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  @Input() quantity: number = 1;
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  sku: string = '';
  attribute: { [name: string]: any } = {};
  @ViewChild(IgxCarouselComponent, { static: true })
  carousel!: IgxCarouselComponent;

  @ViewChild(IgxListComponent, { static: true })
  list!: IgxListComponent;
  block_top: string = '';

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
    description: {
      html: ''
    },
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
            console.log(this.product);
            
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
          }
        }
      ),
      this.apollo.watchQuery<any>({ query: GET_BLOCK_PRODUCT }).valueChanges.subscribe(
        (rep) => {
          this.block_top = rep.data.cmsBlocks.items[0].content;
        }
      ),
    );
  }
  public ngOnInit() {
    this.list.itemClicked.subscribe((args: IListItemClickEventArgs) => {
        this.currentIndex = args.item.index;
        this.carousel.select(this.carousel.get(this.currentIndex));
    });

    this.carousel.slideChanged.subscribe((args: ISlideEventArgs) => {
        this.currentIndex = args.slide.index;
    });
  }

  increment() {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }
}
