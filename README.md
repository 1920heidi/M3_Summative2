# Heidi's Coffee Shop

A single-page React application for the **Heidi's Coffee Shop** store that lets an
administrator manage the coffee catalogue: browse coffees, add new ones, edit
details (including price), search and filter by location, and delete items.
Data is persisted through a simulated REST backend (`json-server`).

Each coffee has a **name, description, origin, price, and location**.

## Tech stack

- **React 19** + **Vite**
- **React Router 7** for client-side routing
- **json-server** as a simulated REST API
- **Vitest** + **React Testing Library** for tests

## Getting started

```bash
npm install
```

You need **two terminals** running at the same time:

```bash
#backend API (http://localhost:3000)
npm run server

#frontend dev server (http://localhost:5173)
npm run dev
```
Then open http://localhost:5173.

> If the page shows "localhost refused to connect", it means a server isn't
> running — start both commands above.

## Available scripts

| Script               Description                                   |
| ------------------- ---------------------------------------------- |
| `npm run dev`       Start the Vite dev server                      |
| `npm run server`    Start json-server on port 3000 (`db.json`)     |
| `npm run build`     Production build (outputs to `dist/`)          |
| `npm run preview`   Preview the production build locally           |
| `npm run deploy`    Build and publish to GitHub Pages              |
| `npm run test`      Run the test suite once                        |
| `npm run test:watch`Run tests in watch mode                        |
| `npm run lint`      Lint the project                               |

## Routes

| Path          | Page          | Purpose                                      |
| ------------- | ------------- | -------------------------------------------- |
| `/`           | Home          | "Heidi's Coffee Shop" landing hero           |
| `/shop`       | Shop          | Card grid + live search + location filter    |
| `/shop/:id`   | ProductDetail | View, edit (PATCH), +100 price, or delete    |
| `/admin`      | AddProduct    | Admin Portal form to create a coffee (POST)  |
| `*`           | NotFound      | 404 fallback                                 |

## Project structure

```
src/
├── api/            # Centralized fetch helpers (GET/POST/PATCH/DELETE)
├── components/     # Reusable UI (Navbar, Footer, SearchBar, ProductForm, ...)
├── context/        # ProductsContext (shares state via useContext)
├── hooks/          # Custom hooks: useProducts, useDebounce
├── pages/          # Route-level pages
├── test/           # Test setup
├── App.jsx         # Router + provider + layout
└── main.jsx        # Entry point
```

## Hooks used

- **Custom:** `useProducts` (owns all CRUD + loading/error state),
  `useDebounce` (debounces the search box).
- **Standard:** `useState`, `useEffect`, `useCallback`, `useContext`,
  `useId` (label/input ids in forms & search), `useRef` (autofocus the
  search input).

## CRUD operations

| Operation | HTTP   | Where                                   |
| --------- | ------ | --------------------------------------- |
| Read      | GET    | Load products on mount / detail view    |
| Create    | POST   | Add Product form                        |
| Update    | PATCH  | Edit product / quick "+100" price bump  |
| Delete    | DELETE | Product card & detail page              |

## Testing

```bash
npm run test
```

19 tests across 6 suites cover the search bar, product form (incl. validation),
product card actions, both custom hooks, the full CRUD flow, and routing/navigation.

## Deployed Project
https://1920heidi.github.io/M3_Summative2/

```bash
npm run deploy
```
This builds the app and publishes the `dist/` folder to the `gh-pages` branch.


