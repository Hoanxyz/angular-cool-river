import {Injectable} from "@angular/core";
import {CREATE_CUSTOMER, GENERATE_CUSTOMER_TOKEN} from "../constants/customer-constants";
import {Observable} from "rxjs";
import {Apollo} from "apollo-angular";
import {ICreateCustomer, ILoginRequest, ILoginResponse} from "../models/customer";
import {MutationResult} from "apollo-angular/types";

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  constructor(
    private apollo: Apollo
  ) {
  }

  Login(data: ILoginRequest): Observable<MutationResult<ILoginResponse>> {
    return this.apollo.mutate({
      mutation: GENERATE_CUSTOMER_TOKEN,
      variables: {
        email: data.email,
        password: data.password
      },
    })
  }
  Create(data: ICreateCustomer) : Observable<MutationResult<ICreateCustomer>> {
    return this.apollo.mutate({
      mutation: CREATE_CUSTOMER,
      variables: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
        is_subscribed: data.is_subscribed
      }
    })
  }
}
