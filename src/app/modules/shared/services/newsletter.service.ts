import {Injectable} from "@angular/core";
import { SUBSCRIBE_EMAIL_NEWSLETTER } from "../constants/newsletter-constants";
import {Apollo} from "apollo-angular";
import { NewsletterResponse } from "../models/newsletter";

@Injectable({
  providedIn: 'root'
})

export class NewsletterService {
  constructor(
    private apollo: Apollo
  ) {
  }

  submitNewSletter(email: string){
    return this.apollo.mutate<NewsletterResponse>({
      mutation: SUBSCRIBE_EMAIL_NEWSLETTER,
      variables: { email },
    })
  }
}
