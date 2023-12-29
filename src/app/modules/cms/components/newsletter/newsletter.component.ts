// newsletter.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { SUBSCRIBE_EMAIL_NEWSLETTER } from 'src/app/modules/services/cms.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})

export class NewsletterComponent implements OnInit {
  newsletterForm!: FormGroup;
  successMessageVisible: boolean = false;

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
    console.log('function submit running');
    if (this.newsletterForm.valid) {
      const email = this.newsletterForm.get('email')?.value;
      this.apollo.mutate({
        mutation: SUBSCRIBE_EMAIL_NEWSLETTER,
        variables: { email },
      }).subscribe(
        ({ data }) => {
          // success
          this.successMessageVisible = true;
          console.log('Newsletter submitted successfully:', data);
        },
        error => {
          // error
          console.error('Error submitting newsletter:', error);
        }
      );
    }
  }
}