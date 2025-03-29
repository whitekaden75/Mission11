import { useEffect, useState } from "react";
import { book } from "../types/books";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "./CartContext";

function BooksList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/api/books?bookhowmany=${pageSize}&pageNum=${pageNum}&sortDirection=${sortDirection}&${selectedCategories.length ? `&${categoryParams}` : ""}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    };
    fetchBooks();
  }, [pageSize, pageNum, sortDirection, selectedCategories]);

  const handleAddToCart = (b: book) => {
    const newItem: CartItem = {
      bookId: b.bookId,
      title: b.title,
      author: b.author,
      price: b.price,
    };

    addToCart(newItem);
    navigate("/cart"); // Navigate after adding to cart
  };

  return (
    <>
      <main className="flex-grow-1 text-center mx-auto">
        <h1>Books List</h1>
        <div className="sort-controls">
          <button
            onClick={() =>
              setSortDirection(sortDirection === "asc" ? "desc" : "asc")
            }
            className="sort-button">
            Sort by Title {sortDirection === "asc" ? "↑" : "↓"}
          </button>
        </div>
        <br />
        {books.map((b) => (
          <div
            key={b.bookId}
            className="card"
            style={{ backgroundColor: "#ADD8E6" }} // Light blue background
          >
            <h2 className="card-title">{b.title}</h2>
            <div className="card-body">
              <p>
                <strong>Author:</strong> {b.author}
              </p>
              <p>
                <strong>Publisher:</strong> {b.publisher}
              </p>
              <p>
                <strong>Classification:</strong> {b.classification}
              </p>
              <p>
                <strong>Category:</strong> {b.category}
              </p>
              <p>
                <strong>Page Count:</strong> {b.pageCount}
              </p>
              <p>
                <strong>ISBN:</strong> {b.isbn}
              </p>
              <p>
                <strong>Book Price:</strong> ${b.price.toFixed(2)}
              </p>
              <button
                className="btn btn-success"
                onClick={() => handleAddToCart(b)}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}

        <br />
        <div className="pagination-controls">
          <button
            onClick={() => setPageNum(Math.max(1, pageNum - 1))}
            disabled={pageNum === 1}>
            Previous
          </button>
          <span className="page-indicator">
            Page {pageNum} of {totalPages}
          </span>
          <button
            onClick={() => setPageNum(Math.min(totalPages, pageNum + 1))}
            disabled={pageNum === totalPages}>
            Next
          </button>
        </div>
        <br />
        <label>
          Results per page:
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </label>
      </main>
    </>
  );
}

export default BooksList;
