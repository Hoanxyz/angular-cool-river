import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/modules/shared/services/product.service';
import { ProductCart } from 'src/app/modules/shared/interface/product-cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {
  @Input() quantity: number = 1;
  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();
  cartId!: any;
  storedCartId!: string | null;
  sku: string = '';
  cartItems: ProductCart = {
    parent_sku: this.sku,
    data: {
      quantity: this.quantity,
      sku: 'Ideapad 120S-KH 11.6 Inch Laptop-Pink-11 inch'
    }
  }
  
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.sku = params['sku'];
    });
  }

  ngOnInit(): void {
    this.storedCartId = localStorage.getItem('cartId');
  
    if (this.storedCartId) {
      this.cartId = this.storedCartId;
    } else {
      this.productService.createEmptyCart().subscribe((response: any) => {
        this.cartId = response.data.createEmptyCart;
        localStorage.setItem('cartId', this.cartId);
      });
    }
  }
  

  addToCart() {
    console.log(this.quantity);
    this.productService.addToCart(this.cartId, this.cartItems).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
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
