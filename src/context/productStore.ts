import create from 'zustand';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/product';

export interface Product {
    id?: number;
    title: string;
    category: string;
    price: number;
    description: string;
    discount?: {
        type: string;
    };
}

interface ProductStore {
    products: Product[];
    fetchProducts: () => Promise<void>;
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (id: number, product: Product) => Promise<void>;
    removeProduct: (id: number) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],

    /** Fetches products from the API and updates the state with the fetched data.
     * @return {Promise<void>} A promise that resolves when the products are fetched and the state is updated.
     */
    fetchProducts: async () => {
        const products = await fetchProducts();
        set({ products });
    },

    /** Adds a new product to the state by sending a POST request to the API_URL endpoint.
     * @param {Product} product - The product object containing the data to be sent in the request body.
     * @return {Promise<void>} A promise that resolves when the product is successfully added.
     */
    addProduct: async (product) => {
        const newProduct = await createProduct(product);
        set((state) => ({ products: [...state.products, newProduct] }));
    },


    /** Updates a product with the given ID using the provided product data.
     * @param {number} id - The ID of the product to update.
     * @param {Product} product - The updated product data.
     * @return {Promise<void>} A promise that resolves when the product is successfully updated.
     */
    updateProduct: async (id, product) => {
        const updatedProduct = await updateProduct(id, product);
        set((state) => ({
            products: state.products.map((p) =>
                p.id === id ? updatedProduct : p
            ),
        }));
    },

    /** Removes a product with the given ID from the products state.
     * @param {number} id - The ID of the product to remove.
     * @return {Promise<void>} A promise that resolves when the product is successfully removed.
     */
    removeProduct: async (id) => {
        await deleteProduct(id);
        set((state) => ({
            products: state.products.filter((p) => p.id !== id),
        }));
    },
}));
