// product-cart.interface.ts
export interface ProductCart {
    parent_sku: string;
    data:{
      quantity: number;
      sku: string;
    }
}