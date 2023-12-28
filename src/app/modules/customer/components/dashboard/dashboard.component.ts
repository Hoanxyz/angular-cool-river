import { Component, OnInit } from '@angular/core';
import {GENERATE_CUSTOMER_ORDER, GET_CUSTOMER_DETAILS, REORDER} from "../../../services/customer.service";
import {Apollo} from "apollo-angular";
import {Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  isLogged = true;
  order: any;
  loading = true;
  itemsId : any = {};

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    if(this.isLogged){
      this.apollo
          .watchQuery<any>({
            query: GENERATE_CUSTOMER_ORDER,
          })
          .valueChanges.subscribe(({ data }) => {
            this.loading = false;
            this.isLogged = true;
            data.customerOrders.items.forEach((e:any) => this.itemsId[e.order_number] = {order_id:e.id});
            const a = data.customer.orders.items.map((e:any) => {
              this.apollo.mutate<any>({
                mutation: REORDER,
                variables: {
                  orderNumber: e.number,
                },
              })
              .subscribe(
                ({ data }) => {
                  this.itemsId[e.number].cart_id = data.reorderItems.cart.id;
                  // console.log(this.itemsId);
                },
                error => {
                  // console.log('there was an error sending the query', error);
                },
              );
              return {...e, id: this.itemsId[e.number] ? this.itemsId[e.number]: null}
            })
            const _data = {...data, customer : {...data.customer, orders: {...data.customer.orders,items: a.sort((a:any, b:any) => b.number - a.number)}}}
            this.order = {..._data};
          },error => {
            this.isLogged = false;
            this.loading = false;
            if(!this.isLogged){
              this.router.navigate(['/customer/login']);
            }
            // console.log('there was an error sending the query', error);
          },
        );
    }
  }
}

