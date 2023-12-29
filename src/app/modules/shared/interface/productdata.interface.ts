// productdata.interface.ts
import type { Product } from './product.interface';

export interface ProductData {
    products: {
        attribute_code: string;
        count: number;
        label: string;
        options: {
            label: string;
            value: string;
        }
        position: number;
        items: Product[];
    };
    
    currency: {
      base_currency_symbol: string;
    };
  }