import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from "@angular/forms";
import {CREATE_CUSTOMER} from "../../../../services/customer.service";
import {Apollo} from "apollo-angular";
import {delay, interval, map, Observable, of, switchMap, timeout, timer} from "rxjs";

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
    this.signupForm = this.fb.group(
      {
        firstname: [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
        lastname: [
          '',
          Validators.compose([
            Validators.required
          ])
        ],
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
        confirmPassword: [
          "",
          Validators.compose([
            Validators.required,
          ]),
          this.validateSamePassword.bind(this)
        ],
        is_subscribed: false
      },
      {
      }
    );
  }

  validateSamePassword(control: AbstractControl) {
    const isValid = this.signupForm?.get('password')?.value === control.value;
    return of(!isValid ? {valueNotMatch: true} : null).pipe(delay(300));
  }

  onSubmit() {
    if (!this.signupForm.invalid) {
      this.apollo.mutate({
        mutation: CREATE_CUSTOMER,
        variables: {
          firstname: this.signupForm.get('firstname')?.value,
          lastname: this.signupForm.get('lastname')?.value,
          email: this.signupForm.get('email')?.value,
          password: this.signupForm.get('password')?.value,
          is_subscribed: this.signupForm.get('is_subscribed')?.value
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
