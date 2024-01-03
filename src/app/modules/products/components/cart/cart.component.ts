import { Component, OnInit } from '@angular/core';
import { GET_BLOCK_PRODUCT, GET_PRODUCT } from 'src/app/modules/services/product.service';
import { ProductService } from 'src/app/modules/shared/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartId!: string;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Tạo giỏ hàng mới và lấy cartId
    this.productService.createEmptyCart().subscribe((response) => {
      console.log(response);
      
      // this.cartId = response.data.createEmptyCart;
    });
  }
}
