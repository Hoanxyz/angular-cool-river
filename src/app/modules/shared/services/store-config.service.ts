import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import { StoreConfig } from "../interface/store-config";
import { GET_LOGO } from "../../services/header.service";

@Injectable({
  providedIn: 'root'
})

export class StoreConfigService {
  constructor(
    private apollo: Apollo
  ) {
  }

  getLogo() {
    return this.apollo.watchQuery<StoreConfig>({ 
      query: GET_LOGO
    })
  }
}
