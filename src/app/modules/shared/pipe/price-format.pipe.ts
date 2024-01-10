import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'USD'): string {
    // Assume value is the price in the default currency (e.g., USD)
    // You can customize this logic based on your application requirements
    const formattedPrice = value.toFixed(2); // Keep 2 decimal places

    // Assuming you want to display the currency code along with the price
    return `${currencyCode}${formattedPrice}`;
  }
}
