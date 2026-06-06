import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AddProduct from "./pages/AddProduct";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { ProductsProvider } from "./context/ProductsContext";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="/admin" element={<AddProduct />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
