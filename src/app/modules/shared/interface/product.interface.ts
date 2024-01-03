
// product.interface.ts
import type { Price } from './price.interface';
import type { ReviewItem } from './review.interface';
import type { MediaGalleryItem } from './gallery.interface';

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: Price;
    description: {
        html: string;
    }
    delivery_returns: string;
    specifications: string;
    review_count: number;
    reviews: {
        items: ReviewItem[];
    };
    media_gallery: MediaGalleryItem[];
}