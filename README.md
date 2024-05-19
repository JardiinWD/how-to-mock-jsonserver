# React, JSON Server, Zustand and Ngrok POC

## How It Works

### Overview
Questa POC dimostra come utilizzare **React**, **JSON Server**, e **Ngrok** per creare e testare un'applicazione con funzionalità CRUD. 

### Why Use Ngrok and JSON Server
- **Ngrok** permette di esporre il tuo server locale a un URL pubblico, utile per testare e condividere l'applicazione in fase di sviluppo con altri collaboratori o client senza dover fare deploy su un server remoto.
- **JSON Server** consente di simulare un backend con API RESTful in pochi minuti, ideale per sviluppo frontend e test, senza dover configurare un backend completo.


## Packages and Dependencies

### Required Packages
Assicurati di avere installato i seguenti pacchetti:

- `axios`
- `json-server`
- `ngrok`
- `zustand`

```json
"dependencies": {
    "axios": "^1.6.8",
    "json-server": "^0.16.1",
    "ngrok": "^3.2.7",
    "zustand": "^4.5.2"
},
```

## Running the Project

Esegui i comandi che seguono in 3 terminali differenti : 

1. run:json-server: questo comando esegue il JSON Server, che simula un database RESTful. 

```bash
yarn run:json-server
```

2. dev: questo comando esegue il Vite, che crea e gestisce l'applicazione React.

```bash
yarn dev
```

3. ngrok: questo comando esegue il Ngrok, che esporta il tuo server locale in un URL pubblico.

```bash
ngrok http 5575
```

## Folder Structure

L'applicazione è organizzata nelle seguenti cartelle

```
src/
|-- api/
|   |-- products.ts
|   |-- reviews.ts
|-- components/
|   |-- ProductList.tsx
|   |-- ReviewList.tsx
|-- context/
|   |-- productStore.ts
|   |-- reviewsStore.ts
```

### API

L'API e il database sono presenti in `src/api` e sono creati con `json-server`. 

#### Product / Reviews Instance

In questo blocco di codice, ho definito l'URL di base per le chiamate API utilizzando `API_URL`. Questo URL è diverso a seconda che stai eseguendo il progetto in locale o su una piattaforma di hosting come ngrok.

- `API_URL = 'https://4c88-94-102-128-55.ngrok-free.app/products'`: questo URL è utilizzato quando stai eseguendo il progetto su ngrok.
- `API_URL = 'http://localhost:5575/products'`: questo URL è utilizzato quando stai eseguendo il progetto in locale.

In entrambe le situazioni, `productApi` è un'istanza di `axios` creata con `axios.create()`, che viene utilizzata per effettuare le chiamate alle API.

`productApi` ha le seguenti proprietà:

- `baseURL`: l'URL di base per le chiamate API.
- `timeout`: il timeout per le chiamate API, in millisecondi.
- `headers`: le intestazioni HTTP per le chiamate API. In particolare, ho aggiunto alcune intestazioni per gestire le chiamate tra frontend e backend, come ad esempio "Access-Control-Allow-Origin" e "Access-Control-Allow-Methods".

In sintesi, questo blocco di codice definisce l'URL di base per le chiamate API e crea un'istanza di `axios` per effettuare le chiamate.

```ts
const API_URL = 'https://4c88-94-102-128-55.ngrok-free.app/products'; // <- for ngrok
// const API_URL = 'http://localhost:5575/products' <- for local development

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
```

#### Product Methods

- fetchProducts: questo metodo è utilizzato per ottenere tutti i prodotti dal database RESTful. 
- createProduct: questo metodo è utilizzato per creare un nuovo prodotto nel database RESTful.
- updateProduct: questo metodo è utilizzato per aggiornare un prodotto nel database RESTful.
- deleteProduct: questo metodo è utilizzato per eliminare un prodotto dal database RESTful.

```ts
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

```

#### Reviews Methods

- fetchReviews: questo metodo è utilizzato per ottenere tutte le recensioni.
- createReview: questo metodo è utilizzato per creare una nuova recensione.
- updateReview: questo metodo è utilizzato per aggiornare una recensione.
- deleteReview: questo metodo è utilizzato per eliminare una recensione. 

```ts
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

```

### Zustand

#### Product / Reviews Store Instance

In questo blocco di codice, ho creato un'istanza di `zustand` per la gestione dello stato delle recensioni. Ho definito un'interfaccia `ReviewStore` che descrive lo stato delle recensioni, incluse le recensioni stesse, e le funzioni per caricare, aggiungere, aggiornare e rimuovere le recensioni.

```ts
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
```

#### Products Store Methods

- fetchProducts: questo metodo è utilizzato per ottenere tutti i prodotti invocando la chiamata API definita in product.ts
- addProduct: questo metodo è utilizzato per aggiungere un nuovo prodotto invocando la chiamata API definita in product.ts
- updateProduct: questo metodo è utilizzato per aggiornare un prodotto invocando la chiamata API definita in product.ts
- removeProduct: questo metodo è utilizzato per rimuovere un prodotto invocando la chiamata API definita in product.ts

```ts
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
    }
```

#### Reviews Store Methods

- fetchReviews: questo metodo è utilizzato per ottenere tutte le recensioni invocando la chiamata API definita in reviews.ts
- addReview: questo metodo è utilizzato per aggiungere una nuova recensione invocando la chiamata API definita in reviews.ts
- updateReview: questo metodo è utilizzato per aggiornare una recensione invocando la chiamata API definita in reviews.ts
- removeReview: questo metodo è utilizzato per rimuovere una recensione invocando la chiamata API definita in reviews.ts

```ts
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
```