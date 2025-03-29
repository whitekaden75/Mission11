import CookieConsent from "react-cookie-consent";
import Bookfilter from "../components/Bookfilter";
import BooksList from "../components/BooksList";
import CartSummary from "../components/cartSummary";
import { useState } from "react";

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="container-fluid d-flex">
      {/* Left Sidebar (Filters) - Fixed to the Left */}
      <div
        className="bg-light p-3 border-end"
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          width: "20%", // Adjust width as needed
        }}>
        <Bookfilter
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>

      {/* Centered Main Content - Takes up the remaining space */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: "20%", // Ensures the content doesn't overlap with the filter on the left
          padding: "20px",
        }}>
        <BooksList selectedCategories={selectedCategories} />
      </div>

      {/* Right Sidebar (Cart Summary) */}
      <div
        className="w-1/4 p-4 bg-gray-100"
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          overflowY: "auto", // Ensures it scrolls if content is too long
        }}>
        <CartSummary />
      </div>

      {/* Cookie Consent Bar (Always at Bottom) */}
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
}

export default BookPage;
