import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GENERATE_CUSTOMER_TOKEN} from "../../../../services/customer.service";
import {Apollo} from "apollo-angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: '',
      password: '',
    });

    // this.apollo
    //   .watchQuery<any>({
    //     query: GENERATE_CUSTOMER_TOKEN,
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //     console.log(result);
    // });
    this.apollo
      .mutate({
        mutation: GENERATE_CUSTOMER_TOKEN,
        variables: {
          email: 'magentodemosup@mail.com',
          password: 'Admin@123'
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('got data', data);
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
  }
}
