import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartItem } from '../../../shared/models/cartitem';
import { CartTotal } from '../../../shared/models/carttotal';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  displayedColumns: string[] = ['image', 'name', 'sku', 'quantity', 'total', 'actions'];
  dataSource: MatTableDataSource<CartItem> = new MatTableDataSource<CartItem>([]);
  cartId: string;
  setLoading: boolean;
  dataCartTotal: CartTotal | null = null;
  discountCode: string = '';
  loadingInputId: string | null = null;
  isToggled: boolean = false;
  private updateQuantitySubject: Subject<{ item: CartItem; newQuantity: number }> = new Subject();

  constructor(
    private cartService: CartService,
    private _snackBar: MatSnackBar
  ) {
    this.cartId = "enCHisNlvHfqcIWzxXhVCgrMMmo9v7Rf";
    this.setLoading = true;
    this.updateQuantitySubject.pipe(debounceTime(1000)).subscribe(({ item, newQuantity }) => {
      this.updateCart(item, newQuantity);
    });
  }
  isLoading(): boolean  {
    return this.setLoading = true
  }
  loadDone(): boolean {
    return this.setLoading = false
  }
  resetInputId(): void {
    this.loadingInputId = null;
  }
  toggle(): void {
    this.isToggled = !this.isToggled;
  }

  ngOnInit(): void {
    this.fetchCartData();
  }
  private fetchCartData(): void {
    this.cartService.getCart(this.cartId).subscribe({
      next: ({ data }) => {
        const dataItem: CartItem[] = data?.cart?.items;
        this.dataCartTotal = data?.cart;
        this.dataSource.data = dataItem;
        this.loadDone();
      },
      error: (error) => {
        console.error('Error fetching cart:', error);
        this.loadDone();
        // Handle the error - log or display more detailed information
      }
    });
  }

  plusQuantity(item: CartItem): void {
    let newQuantity = item.quantity + 1;
    this.updateCart(item, newQuantity);
  }

  minusQuantity(item: CartItem): void {
    let newQuantity = item.quantity - 1;
    this.updateCart(item, newQuantity);
  }

  updateDataSource(): void {
    // Update the data source
    this.dataSource.data = [...this.dataSource.data];
  }

  updateCart(item: CartItem, quantity: number): void {
    if(quantity > 0) {
      this.loadingInputId = item.uid;
    }
    const cartItems = [
      {
        cart_item_uid: item.uid,
        quantity,
      },
    ];
    this.cartService.updateCartItems(this.cartId, cartItems).subscribe({
      next: (result) => {
        console.log('Mutation result:', result);
        this.resetInputId()
      },
      error: (error) => {
        console.error('Mutation error:', error);
        this.resetInputId();
      }
    });
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    this.updateQuantitySubject.next({ item, newQuantity });
  }

  removeItem(item: CartItem): void {
    this.updateCart(item, 0)
  }

  applyDiscountCode(): void {
    // Call the mutation to apply the discount code
    if (this.discountCode.trim() !== '') {
      this.cartService.applyCouponToCart(this.cartId, this.discountCode).subscribe({
        next: (data) => {
          this.fetchCartData();
          this._snackBar.open('Success: add done', '', {
            duration: 2000,
          });
        },
        error: (error) => {
          this._snackBar.open('Error', error, {
            duration: 2000,
          });
        }
      });
    }
  }
  removeDiscountCode(): void {
    this.cartService.removeCouponFromCart(this.cartId).subscribe({
      next: (data) => {
        this.fetchCartData();
      },
      error: (error) => {
        this._snackBar.open('Error', error, {
          duration: 2000,
        });
      }
    });
  }
}
