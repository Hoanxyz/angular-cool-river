export interface CartItem {
    uid: string;
    prices: {
      discounts: any; // You may want to replace this with a more specific type if discounts can be present
      row_total: {
        currency: string;
        value: number;
      };
      row_total_including_tax: {
        currency: string;
        value: number;
      };
      total_item_discount: {
        currency: string;
        value: number;
      };
    };
    configurable_options: any[];
    customizable_options: any[];
    product: {
      uid: string;
      name: string;
      sku: string;
      url_key: string;
      url_suffix: string;
      image: {
        url: string;
        label: string;
      }
    };
    quantity: number;
}