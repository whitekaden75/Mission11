import "./App.css";
import { CartProvider } from "./components/CartContext";
import BookPage from "./pages/BookPage";
import CartPage from "./pages/Cart";
import AdminBookPage from "./pages/adminBooksPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminBookPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
