import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  CREATE_CUSTOMER,
  GENERATE_CUSTOMER_TOKEN,
} from '../../../services/customer.service';
import { Apollo } from 'apollo-angular';
import {
  delay,
  interval,
  map,
  Observable,
  of,
  switchMap,
  timeout,
  timer,
} from 'rxjs';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/modules/shared/services/customer.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstname: ['', Validators.compose([Validators.required])],
        lastname: ['', Validators.compose([Validators.required])],
        email: [
          '',
          Validators.compose([Validators.email, Validators.required]),
        ],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: [
          '',
          Validators.compose([Validators.required]),
          this.validateSamePassword.bind(this),
        ],
        is_subscribed: true,
      },
      {}
    );
  }

  validateSamePassword(control: AbstractControl) {
    const isValid = this.signupForm?.get('password')?.value === control.value;
    return of(!isValid ? { valueNotMatch: true } : null).pipe(delay(300));
  }

  onSubmit() {
    const paramsCreate = {
      firstname: this.signupForm.get('firstname')?.value,
      lastname: this.signupForm.get('lastname')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
      is_subscribed: this.signupForm.get('is_subscribed')?.value,
    };
    const paramsLogin = {
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    };
    if (!this.signupForm.invalid) {
      this.customerService.Create(paramsCreate).subscribe(
        ({ data }) => {
          this.customerService.Login(paramsLogin).subscribe(
            ({ data }) => {
              localStorage.setItem(
                'customer_token',
                data?.generateCustomerToken.token
              );
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 500);
            },
            (error) => {
              console.log('there was an error sending the query', error);
            }
          );
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
    }
  }
}
