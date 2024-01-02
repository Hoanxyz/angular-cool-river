// newsletter.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { SUBSCRIBE_EMAIL_NEWSLETTER } from 'src/app/modules/services/cms.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class NewsletterComponent implements OnInit {
  newsletterForm!: FormGroup;
  successMessageVisible: boolean = false;
  errorMessageVisible: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private apollo: Apollo
  ) {   
  }

  ngOnInit(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.get('email')?.value;
      this.apollo.mutate({
        mutation: SUBSCRIBE_EMAIL_NEWSLETTER,
        variables: { email },
      }).subscribe(
        ({ data }) => {
          // success
          this.successMessageVisible = true;
          this.errorMessageVisible = false;
        },
        error => {
          // error
          this.errorMessage = error;
          this.successMessageVisible = false;
          this.errorMessageVisible = true;
          console.error('Error submitting newsletter:', error);
        }
      );
    }
  }
}