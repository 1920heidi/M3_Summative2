// Centralized API layer for the simulated json-server backend.
// Run the backend with:  npm run server  (json-server on port 3000)

export const API_URL = "http://localhost:3000/products";

async function handle(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

// READ — fetch all products
export function getProducts() {
  return fetch(API_URL).then(handle);
}

// READ — fetch a single product by id
export function getProduct(id) {
  return fetch(`${API_URL}/${id}`).then(handle);
}

// CREATE — add a new product (POST)
export function createProduct(product) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  }).then(handle);
}

// UPDATE — edit fields of a product such as price (PATCH)
export function updateProduct(id, changes) {
  return fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  }).then(handle);
}

// DELETE — remove a product
export function deleteProduct(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    return id;
  });
}
