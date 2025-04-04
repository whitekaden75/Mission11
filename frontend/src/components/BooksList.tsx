import { useEffect, useState } from "react";
import { book } from "../types/books";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "./CartContext";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./pagination";

function BooksList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          sortDirection,
          selectedCategories
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalItems / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageSize, pageNum, sortDirection, selectedCategories]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

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
        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newPageSize: number) => {
            setPageSize(newPageSize);
            setPageNum(1);
          }}
        />
      </main>
    </>
  );
}

export default BooksList;
