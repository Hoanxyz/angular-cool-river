// review.interface.ts
export interface ReviewItem {
    average_rating: string;
    ratings_breakdown: {
        value: number;
    }[];
}
