
// product.interface.ts
import type { Price } from './price.interface';
import type { ReviewItem } from './review.interface';
import type { MediaGalleryItem } from './gallery.interface';

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: Price;
    review_count: number;
    reviews: {
        items: ReviewItem[];
    };
    media_gallery: MediaGalleryItem[];
}