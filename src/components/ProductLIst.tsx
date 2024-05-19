import React, { useEffect, useState } from "react";
import { useProductStore } from "../context/productStore";
import '../index.scss'


const ProductList: React.FC = () => {
  /* --------- ZUSTAND ---------- */
  const { products, fetchProducts, addProduct, updateProduct, removeProduct } =
    useProductStore();
  /* --------- LOCAL STATE ---------- */
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    price: 0,
    description: "",
  });
  const [updateData, setUpdateData] = useState({
    id: 0,
    title: "",
    category: "",
    price: 0,
    description: "",
  });

  // Fetches products from the API.
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts]);

  // Handles the addition of a new product.
  const handleAddProduct = async () => {
    try {
      console.log("Adding product:", newProduct);
      // Add the new product to the store
      await addProduct(newProduct);
      // Clear the input fields
      setNewProduct({ title: "", category: "", price: 0, description: "" });
    } catch (error) {
      console.log("Cannot add product:", error);
    }
  };

  // Handles the update of an existing product.
  const handleUpdateProduct = async () => {
    try {
      console.log("Updating product:", updateData);
      // Update the product in the store
      await updateProduct(updateData.id, updateData);
      // Clear the input fields for update data
      setUpdateData({
        id: 0,
        title: "",
        category: "",
        price: 0,
        description: "",
      });
    } catch (error) {
      console.log("Cannot update product:", error);
    }
  };

  // Handles the deletion of a product.
  const handleDeleteProduct = async (id: number) => {
    try {
      console.log("Deleting product with ID:", id);
      await removeProduct(id);
    } catch (error) {
      console.log("Cannot delete product:", error);
    }
  };

  return (
    <div>
      {/* Product List */}
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price}
            <button className="ml-1" onClick={() => handleDeleteProduct(product.id!)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* ADD new Product */}
      <div className="flex-col-start">
        <h3>Add New Product</h3>
        {/* Title */}
        <div className="flex-row-start">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            placeholder="Title"
            className="ml-1"
          />
        </div>
        {/* Category */}
        <div className="flex-row-start">
          <label htmlFor="category">Category</label>
          <input
          type="text"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
          placeholder="Category"
          className="ml-1"
        />
        </div>
        {/* Price */}
        <div className="flex-row-start">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="ml-1"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: +e.target.value })
            }
            placeholder="Price"
          />
          </div>
        {/* Description */}
        <div className="flex-row-start">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            placeholder="Description"
            className="ml-1"
        />
        </div>
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      {/* Update Product */}
      <div className="flex-col-start">

        <h3>Update Product</h3>
        {/* ID */}
        <div className="flex-row-start">
          <label htmlFor="id">ID</label>
          <input
            className="ml-1"
            type="number"
            value={updateData.id}
            onChange={(e) =>
              setUpdateData({ ...updateData, id: +e.target.value })
            }
            placeholder="ID"
          />
        </div>
        {/* Title */}
        <div className="flex-row-start">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={updateData.title}
            onChange={(e) =>
              setUpdateData({ ...updateData, title: e.target.value })
            }
            placeholder="Title"
            className="ml-1"
          />
        </div>
        {/* Category */}
        <div className="flex-row-start">
          <label htmlFor="category">Category</label>
          <input
            className="ml-1"
            type="text"
            value={updateData.category}
            onChange={(e) =>
              setUpdateData({ ...updateData, category: e.target.value })
            }
            placeholder="Category"
          />
        </div>
        {/* Price */}
        <div className="flex-row-start">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              value={updateData.price}
              className="ml-1"
              onChange={(e) =>
                setUpdateData({ ...updateData, price: +e.target.value })
              }
              placeholder="Price"
            />
        
        </div>
        {/* Description */}
        <div className="flex-row-start">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            value={updateData.description}
            onChange={(e) =>
              setUpdateData({ ...updateData, description: e.target.value })
            }
            placeholder="Description"
            className="ml-1"
          />
        </div>
        <button onClick={handleUpdateProduct}>Update Product</button>
      </div>
    </div>
  );
};

export default ProductList;
