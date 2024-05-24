import axios from 'axios';
import { Product } from '../context/productStore';

const API_URL = 'https://how-to-mock-jsonserver.onrender.com/products' // <- from render
// const API_URL = 'https://4c88-94-102-128-55.ngrok-free.app/products'; // <- for ngrok
// const API_URL = 'http://localhost:5575/products' // <- for local development

const productApi = axios.create({
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

export const fetchProducts = async () => {
    const response = await productApi.get(API_URL);
    return response.data;
};

/** Creates a new product by sending a POST request to the API_URL endpoint.
 * @param {any} product - The product object containing the data to be sent in the request body.
 * @return {Promise<any>} A promise that resolves to the response data from the API.
 */
export const createProduct = async (product: Product) => {
    const response = await productApi.post(API_URL, product);
    return response.data;
};

/** Updates a product by sending a PUT request to the API_URL endpoint with the specified ID and product data.
 * @param {number} id - The ID of the product to update.
 * @param {any} product - The updated product data to send in the request body.
 * @return {Promise<any>} A promise that resolves to the response data from the API.
 */
export const updateProduct = async (id: number, product: Product) => {
    const response = await productApi.put(`${API_URL}/${id}`, product);
    return response.data;
};


/** Deletes a product by sending a DELETE request to the API_URL endpoint with the specified ID.
 * @param {number} id - The ID of the product to delete.
 * @return {Promise<void>} A promise that resolves when the product is successfully deleted.
 */
export const deleteProduct = async (id: number) => {
    await productApi.delete(`${API_URL}/${id}`);
};
