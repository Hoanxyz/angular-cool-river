import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_CART_QUERY, MUTATION_UPDATE_CART, MUTATION_APPLY_COUPON_CART, MUTATION_REMOVE_COUPON_CART } from '../constants/cart-constants';
import { CartItemUpdateInput } from '../interface/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private apollo: Apollo) {}

  // Query to get cart data
  getCart(cartId: string): Observable<any> {
    return this.apollo.watchQuery<any>({
      query: GET_CART_QUERY,
      variables: { cartId },
    }).valueChanges;
  }

  // Mutation to update cart items
  updateCartItems(cartId: string, cartItems: CartItemUpdateInput[]): Observable<any> {
    return this.apollo.mutate({
      mutation: MUTATION_UPDATE_CART,
      variables: {
        cartId,
        cartItems,
      },
    });
  }
  applyCouponToCart(cartId: string, couponCode: string): Observable<any> {
    return this.apollo.mutate({
      mutation: MUTATION_APPLY_COUPON_CART,
      variables: { cartId, couponCode },
    });
  }
  removeCouponFromCart(cartId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: MUTATION_REMOVE_COUPON_CART,
      variables: {
        cartId,
      },
    });
  }
}