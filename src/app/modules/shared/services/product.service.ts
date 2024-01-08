import {Injectable} from "@angular/core";
import {GENERATE_CUSTOMER_TOKEN} from "../constants/customer-constants";
import {Observable} from "rxjs";
import {Apollo, gql} from "apollo-angular";
import {ILoginRequest, ILoginResponse} from "../models/customer";
import {MutationResult} from "apollo-angular/types";
import { ADD_TO_CART, GET_CART_EMPTY_ID } from "../constants/product-constants";

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

  addToCart(cartId: string, cartItems: { sku: string }[]) {
    return this.apollo.mutate({
      mutation: ADD_TO_CART,
      variables: {
        cartId: cartId,
        cartItems: cartItems,
      },
    });
  }
}
