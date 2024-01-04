import {Injectable} from "@angular/core";
import {GET_CONTENT_CMS_BLOCK} from "../constants/cms-constants";
import {Apollo} from "apollo-angular";
import { CMSResponse } from "../models/cms";

@Injectable({
  providedIn: 'root'
})

export class CmsService {
  constructor(
    private apollo: Apollo
  ) {
  }

  getBlockContent(ids: string){
    return this.apollo.watchQuery<CMSResponse>({ 
        query: GET_CONTENT_CMS_BLOCK,
        variables: { blockId: ids },
      })
  }
}
