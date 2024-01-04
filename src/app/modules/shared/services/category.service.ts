import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import { CategoryList } from "../interface/category-list";
import { GET_CATEGORIES } from "../../services/header.service";

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(
    private apollo: Apollo
  ) {
  }

  getCategoriesName(){
    return this.apollo.watchQuery<CategoryList>({ 
      query: GET_CATEGORIES
    })
  }
}
