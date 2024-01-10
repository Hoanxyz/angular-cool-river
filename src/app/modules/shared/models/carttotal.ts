export interface CartTotal {
    applied_coupons: any[];
    prices: {
        discounts: any[]; // You may want to replace this with a more specific type if discounts can be present
        grand_total: {
            currency: string;
            value: number;
        };
        subtotal_excluding_tax: {
            currency: string;
            value: number;
        };
        subtotal_including_tax: {
            currency: string;
            value: number;
        };
        subtotal_with_discount_excluding_tax: {
            currency: string;
            value: number;
        };
        applied_taxes: any[];
    }
    
}
