/* eslint-disable react-refresh/only-export-components -- this file
   intentionally co-locates the provider component with its consumer hook,
   the conventional pattern for a React context module. */
import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts";

const ProductsContext = createContext(null);

/**
 * Provider wraps the app and shares product state + CRUD actions
 * (from the useProducts custom hook) through React context,
 * so pages/components don't have to prop-drill.
 */
export function ProductsProvider({ children }) {
  const value = useProducts();
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// Consumer hook with a guard so misuse fails loudly.
export function useProductsContext() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }
  return ctx;
}

export default ProductsContext;
