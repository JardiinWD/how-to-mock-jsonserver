import create from 'zustand';
import { fetchReviews, createReview, updateReview, deleteReview } from '../api/review';

export interface Review {
    id?: number;
    rating: number;
    comment: string;
    productId: number;
}

interface ReviewStore {
    reviews: Review[];
    fetchReviews: () => Promise<void>;
    addReview: (review: Review) => Promise<void>;
    updateReview: (id: number, review: Review) => Promise<void>;
    removeReview: (id: number) => Promise<void>;
}

export const useReviewStore = create<ReviewStore>((set) => ({
    reviews: [],

    /** Fetches reviews from the API and updates the state with the fetched data.
     * @return {Promise<void>} A promise that resolves when the reviews are fetched and the state is updated.
     */
    fetchReviews: async () => {
        const reviews = await fetchReviews();
        set({ reviews });
    },

    /** Adds a new review by sending a POST request to the API_URL endpoint.
     * @param {Review} review - The review object containing the data to be sent in the request body.
     * @return {Promise<void>} A promise that resolves when the review is successfully added.
     */
    addReview: async (review) => {
        const newReview = await createReview(review);
        set((state) => ({ reviews: [...state.reviews, newReview] }));
    },

    /** Updates a review by sending a PUT request to the API_URL endpoint with the specified ID and review data.
     * @param {number} id - The ID of the review to update.
     * @param {Review} review - The updated review data to send in the request body.
     * @return {Promise<void>} A promise that resolves when the review is successfully updated.
     */
    updateReview: async (id, review) => {
        const updatedReview = await updateReview(id, review);
        set((state) => ({
            reviews: state.reviews.map((review) =>
                review.id === id ? updatedReview : review
            ),
        }));
    },

    /** Removes a review with the given ID from the reviews state.
     * @param {number} id - The ID of the review to remove.
     * @return {Promise<void>} A promise that resolves when the review is successfully removed.
     */
    removeReview: async (id) => {
        await deleteReview(id);
        set((state) => ({
            reviews: state.reviews.filter((review) => review.id !== id),
        }));
    },
}));
