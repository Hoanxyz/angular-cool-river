import { Component, ViewEncapsulation } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CONTENT_HOME } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  conTentHome: string = ''

  constructor(private apollo: Apollo) {
    this.apollo
      .watchQuery<any>({ query: GET_CONTENT_HOME })
      .valueChanges.subscribe(
        (rep) => {
          this.conTentHome = rep.data.cmsPage.content
        }
      );
  }
}
