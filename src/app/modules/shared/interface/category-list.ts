// newsletter interface
export interface CategoryList {
  categoryList: Category[];
}

export interface Category {
  id: number;
  name: string;
  urlKey: string;
}
