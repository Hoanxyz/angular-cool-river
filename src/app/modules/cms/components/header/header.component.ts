import {Component, OnInit} from '@angular/core';
import {GET_CUSTOMER_DETAILS} from "../../../services/customer.service";
import {Apollo} from "apollo-angular";
import {Router, Event, NavigationStart, NavigationEnd, NavigationError} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogged = false;
  customer: any;
  loading = true;

  constructor(
    private apollo: Apollo,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.apollo
          .watchQuery<any>({
            query: GET_CUSTOMER_DETAILS,
          })
          .valueChanges.subscribe(({ data, loading }) => {
            this.loading = false;
            this.isLogged = true;
            this.customer = data.customer;
            console.log(data);
          },error => {
            this.loading = false;
            console.log('there was an error sending the query', error);
          },
        );
      }
    });
  }

  logout() {
    localStorage.setItem("customer_token", '');
    setTimeout(() => {
      this.router.navigate(['/'])
    }, 1000)
  }
}
