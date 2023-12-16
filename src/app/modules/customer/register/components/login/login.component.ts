import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {GENERATE_CUSTOMER_TOKEN} from "../../../../services/customer.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apollo: Apollo
  ) {
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.email,
          Validators.required
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      showPassword: false
    })
  }


  onSubmit() {
    if (!this.loginForm.invalid) {
      this.apollo.mutate({
        mutation: GENERATE_CUSTOMER_TOKEN,
        variables: {
          email: this.loginForm.get('email')?.value,
          password: this.loginForm.get('password')?.value
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
}
