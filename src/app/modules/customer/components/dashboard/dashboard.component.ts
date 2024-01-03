import { Component, OnInit } from '@angular/core';
import {GENERATE_CUSTOMER_ORDER, GET_COUNTRY, GET_CUSTOMER_DETAILS, REORDER} from "../../../services/customer.service";
import {Apollo} from "apollo-angular";
import {Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";
import { switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  isLogged = true;
  order: any;
  loading = true;
  address: any = {};
  country: any;
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
  .valueChanges.pipe(
    switchMap(async ({ data }) => {
      this.loading = false;
      this.isLogged = true;

      let shipping_address = await data.customer.addresses.find((e: any) => !!e.default_billing);
      let billing_address = await data.customer.addresses.find((e: any) => !!e.default_shipping);

      console.log(billing_address);
      console.log(shipping_address);

      if (shipping_address) {
        try {
          const result = await this.apollo
            .query<any>({
              query: GET_COUNTRY,
              variables: {
                id: shipping_address.country_id,
              },
            })
            .toPromise();
            const countryData = result?.data

            if (countryData && countryData.country) {
              shipping_address = { ...shipping_address, country_name: countryData.country.full_name_english };
            }
        } catch (error) {
          console.log('Error when getting country name', error);
        }
      }

      data.customerOrders.items.forEach((e: any) => (this.itemsId[e.order_number] = { order_id: e.id }));

      const a = await Promise.all(
        data.customer.orders.items.map(async (e: any) => {
          try {
            const  data  = await this.apollo.mutate<any>({
              mutation: REORDER,
              variables: {
                orderNumber: e.number,
              },
            }).toPromise();
            const item = data?.data
            this.itemsId[e.number].cart_id = item.reorderItems.cart.id;

            return { ...e, id: this.itemsId[e.number] ? this.itemsId[e.number] : null };
          } catch (error) {
            console.log('there was an error sending the query', error);
            return null;
          }
        })
      );

      try {
        const [shippingCountryData, billingCountryData] = await Promise.all([
          this.apollo
            .watchQuery<any>({
              query: GET_COUNTRY,
              variables: {
                id: billing_address.country_id,
              },
            })
            .valueChanges.pipe(take(1))
            .toPromise(),
          this.apollo
            .watchQuery<any>({
              query: GET_COUNTRY,
              variables: {
                id: billing_address.country_id,
              },
            })
            .valueChanges.pipe(take(1))
            .toPromise(),
        ]);

        if (shippingCountryData && shippingCountryData.data) {
          this.address = {
            ...this.address,
            default_shipping: {
              ...shipping_address,
              country_name: shippingCountryData.data.country.full_name_english,
            },
          };
        }

        if (billingCountryData && billingCountryData.data) {
          this.address = {
            ...this.address,
            default_billing: {
              ...billing_address,
              country_name: billingCountryData.data.country.full_name_english,
            },
          };
        }
      } catch (error) {
        console.log('there was an error sending the query', error);
      }

      const _data = { ...data, customer: { ...data.customer, orders: { ...data.customer.orders, items: a.sort((a:any, b:any) => b.number - a.number ) }} };
      this.order = { ..._data };
      console.log(this.order);
      console.log(this.address);
    })
  )
  .subscribe(
    () => {
      // Handle any logic after the final query has completed
      console.log('Query completed');
    },
    (error) => {
      this.isLogged = false;
      this.loading = false;
      if (!this.isLogged) {
        this.router.navigate(['/customer/login']);
      }
      console.log('there was an error sending the query', error);
    }
  );
  }
}
}

