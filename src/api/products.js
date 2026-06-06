// Centralized API layer for the simulated json-server backend.
// Local dev: run `npm run server` (json-server on port 3000).
// Deployed (GitHub Pages): json-server can't run there, so fall back to
// my-json-server, which serves this repo's db.json as a live API.
// Note: on the deployed site, writes (POST/PATCH/DELETE) appear to succeed but
// are not persisted — they reset on reload.
export const API_URL = import.meta.env.PROD
  ? "https://my-json-server.typicode.com/1920heidi/M3_Summative2/products"
  : "http://localhost:3000/products";

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
