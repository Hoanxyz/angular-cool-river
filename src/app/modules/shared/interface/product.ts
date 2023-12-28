// product.ts
export interface Product {
    name: string;
    price?: {
        regularPrice?: {
            amount?: {
                value: number;
            }
        },
        maximalPrice?: {
            amount?: {
                value: number;
            }
        },
        minimalPrice?: {
            amount?: {
                value: number;
            }
        }
    }
    review_count: number;
    reviews?: {
      items?: {
        average_rating?: string;
      }[];
    };
}