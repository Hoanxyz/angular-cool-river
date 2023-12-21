import { Component, ViewEncapsulation } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CONTENT_FOOTER_BOTTOM, GET_CONTENT_NEWSLETER } from 'src/app/modules/services/cms.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  conTentNewsletter: string = ''
  conTentFooter: string = ''
  constructor(private apollo: Apollo) {
    this.apollo
      .watchQuery<any>({ query: GET_CONTENT_NEWSLETER })
      .valueChanges.subscribe(
        (rep) => {
          this.conTentNewsletter = rep.data.cmsBlocks.items[0].content
        }
      );
    this.apollo
      .watchQuery<any>({ query: GET_CONTENT_FOOTER_BOTTOM })
      .valueChanges.subscribe(
        (rep) => {
          this.conTentFooter = rep.data.cmsBlocks.items[0].content
        }
      );
  }

}
