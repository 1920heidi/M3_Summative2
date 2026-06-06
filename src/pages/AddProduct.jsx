import { useState } from "react";
import ProductForm from "../components/ProductForm";
import AdminProductList from "../components/AdminProductList";
import { useProductsContext } from "../context/ProductsContext";

// Admin Portal: a single top panel that adds a coffee (POST) or, when a list
// item's Edit is clicked, switches into editing that coffee (PATCH).
function AddProduct() {
  const { addProduct, editProduct } = useProductsContext();
  const [editingProduct, setEditingProduct] = useState(null);
  // Bumping the key remounts the add form to clear it after a successful add.
  const [formKey, setFormKey] = useState(0);

  function handleAdd(product) {
    addProduct(product).then(() => setFormKey((k) => k + 1));
  }

  function handleUpdate(changes) {
    editProduct(editingProduct.id, changes).then(() => setEditingProduct(null));
  }

  return (
    <section className="admin">
      {editingProduct ? (
        <>
          <h2>Edit {editingProduct.name}</h2>
          <ProductForm
            key={`edit-${editingProduct.id}`}
            initialValues={{
              name: editingProduct.name,
              description: editingProduct.description || "",
              price: editingProduct.price,
              location: editingProduct.location || "Kenya",
            }}
            onSubmit={handleUpdate}
            submitLabel="Save Changes"
          />
          <button
            className="btn-outline"
            style={{ marginTop: "12px" }}
            onClick={() => setEditingProduct(null)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2>Admin Portal — Add Coffee</h2>
          <ProductForm
            key={`add-${formKey}`}
            onSubmit={handleAdd}
            submitLabel="Submit"
          />
        </>
      )}

      <AdminProductList onEdit={setEditingProduct} />
    </section>
  );
}

export default AddProduct;
