import { Component, ViewEncapsulation } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CmsService } from 'src/app/modules/shared/services/cms.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent {
  conTentNewsletter: string = ''
  conTentFooter: string = ''
  newsLetterBlockId : string = "newsletter";
  footerBottomBlockId : string = "footer";
  constructor(private apollo: Apollo, private cmsService: CmsService) {
    this.cmsService.getBlockContent(this.newsLetterBlockId)
      .valueChanges.subscribe(
        (rep) => {
          this.conTentNewsletter = rep.data.cmsBlocks.items[0].content
        }
      );
    this.cmsService.getBlockContent(this.footerBottomBlockId)
      .valueChanges.subscribe(
        (rep) => {
          this.conTentFooter = rep.data.cmsBlocks.items[0].content
        }
      );
  }

}
