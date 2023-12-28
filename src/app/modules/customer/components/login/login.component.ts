import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomerService} from "../../../shared/services/customer.service";
import {ILoginRequest} from "../../../shared/models/customer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginRequest!: ILoginRequest;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
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
    });
  }


  onSubmit() {
    this.loginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    if (!this.loginForm.invalid) {
      this.customerService.Login(this.loginRequest)
      .subscribe(
        ({ data }) => {
          // @ts-ignore
          localStorage.setItem("customer_token", data.generateCustomerToken.token);
          setTimeout(() => {
            this.router.navigate(['/dashboard'])
          }, 1000)
        },
        error => {
          console.log('there was an error sending the query', error);
        },
      );
    }
  }
}
