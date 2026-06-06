import { useCallback, useEffect, useState } from "react";
import * as api from "../api/products";

/**
 * Custom hook that owns all product state and CRUD logic.
 * Exposes loading/error flags and the four CRUD operations
 * (read, create, update, delete) backed by the json-server API.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // READ — load all products. State updates happen only in the async
  // callbacks, so this is safe to call from an effect on mount.
  const loadProducts = useCallback(() => {
    return api
      .getProducts()
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Re-fetch on demand (from event handlers), showing the loading state.
  const refetch = useCallback(() => {
    setLoading(true);
    return loadProducts();
  }, [loadProducts]);

  // CREATE
  const addProduct = useCallback((product) => {
    return api.createProduct(product).then((created) => {
      setProducts((prev) => [...prev, created]);
      return created;
    });
  }, []);

  // UPDATE (patch any fields, e.g. price)
  const editProduct = useCallback((id, changes) => {
    return api.updateProduct(id, changes).then((updated) => {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
      );
      return updated;
    });
  }, []);

  // DELETE
  const removeProduct = useCallback((id) => {
    return api.deleteProduct(id).then(() => {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return id;
    });
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    refetch,
  };
}
