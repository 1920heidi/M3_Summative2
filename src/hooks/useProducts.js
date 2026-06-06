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
  // The deployed API (my-json-server) can be slow/fail on the first request
  // after it has been idle, so retry a few times before showing an error.
  const loadProducts = useCallback((attempt = 1) => {
    const MAX_ATTEMPTS = 4;
    return api
      .getProducts()
      .then((data) => {
        setProducts(data);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (attempt < MAX_ATTEMPTS) {
          // Wait a little longer each time, then try again.
          return new Promise((resolve) => setTimeout(resolve, attempt * 800))
            .then(() => loadProducts(attempt + 1));
        }
        setError(err.message);
        setLoading(false);
      });
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
