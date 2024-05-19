import axios from 'axios';
import { Review } from '../context/reviewStore';

const API_URL = 'https://4c88-94-102-128-55.ngrok-free.app/reviews'; // <- for ngrok
// const API_URL = 'http://localhost:5575/reviews' // <- for local development

const reviewsApi = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": true,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "ngrok-skip-browser-warning": true
    },
})


export const fetchReviews = async () => {
    const response = await reviewsApi.get(API_URL);
    return response.data;
};

/** Creates a new review by sending a POST request to the API_URL endpoint.
 * @param {any} review - The review object containing the data to be sent in the request body.
 * @return {Promise<any>} A promise that resolves to the response data from the API.
 */
export const createReview = async (review: Review) => {
    const response = await reviewsApi.post(API_URL, review);
    return response.data;
};

/** Updates a review by sending a PUT request to the API_URL endpoint with the specified ID and review data.
 * @param {number} id - The ID of the review to update.
 * @param {any} review - The updated review data to send in the request body.
 * @return {Promise<any>} A promise that resolves to the response data from the API.
 */
export const updateReview = async (id: number, review: Review) => {
    const response = await reviewsApi.put(`${API_URL}/${id}`, review);
    return response.data;
};


/** Deletes a review by sending a DELETE request to the API_URL endpoint with the specified ID.
 * @param {number} id - The ID of the review to delete.
 * @return {Promise<void>} A promise that resolves when the review is successfully deleted.
 */
export const deleteReview = async (id: number) => {
    await reviewsApi.delete(`${API_URL}/${id}`);
};
