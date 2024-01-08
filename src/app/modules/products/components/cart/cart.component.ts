import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartId!: any;
  storedCartId!: string | null;
  constructor(private productService: ProductService) {}

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
    const cartItems = [{ sku: "laptop-7", quantity: 1 }];

    this.productService.addToCart(this.cartId, cartItems).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
      },
      (error) => {
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
