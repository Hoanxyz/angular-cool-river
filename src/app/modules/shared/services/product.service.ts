import {Injectable} from "@angular/core";
import {Apollo, gql} from "apollo-angular";
import { ADD_TO_CART, GET_CART_EMPTY_ID } from "../constants/product-constants";
import { ProductCart } from "../interface/product-cart.interface";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(
    private apollo: Apollo
  ) {
  }

  createEmptyCart() {
    return this.apollo.mutate({
      mutation: GET_CART_EMPTY_ID
    });
  }

  addToCart(cartId: string, cartItems: ProductCart ) {
    return this.apollo.mutate({
      mutation: ADD_TO_CART,
      variables: {
        cartId: cartId,
        cartItems: cartItems,
      },
    });
  }
}
