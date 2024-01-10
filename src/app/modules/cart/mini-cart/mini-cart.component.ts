import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CartTotal } from '../../shared/models/carttotal';
import { CartItem } from '../../shared/models/cartitem';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css'],
})
export class MiniCartComponent implements OnInit {
  displayedColumns: string[] = ['image', 'info'];
  dataSource: MatTableDataSource<CartItem> = new MatTableDataSource<CartItem>([]);
  cartId: string;
  setLoading: boolean;
  dataCartTotal: CartTotal | null = null;
  loadingInputId: string | null = null;
  isToggled: boolean = false;
  private updateQuantitySubject: Subject<{ item: CartItem; newQuantity: number }> = new Subject();
  isMinicartOpen = false;
  toTalQuality:number = 0;

  toggleMinicart(): void {
    this.isMinicartOpen = !this.isMinicartOpen;
  }
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
        this.toTalQuality = data?.cart?.total_quantity
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
}
