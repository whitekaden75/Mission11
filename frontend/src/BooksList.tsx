import { useEffect, useState } from "react";
import { book } from "./types/books";

function BooksList() {
  const [books, setBooks] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/books?bookhowmany=${pageSize}&pageNum=${pageNum}&sortDirection=${sortDirection}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    };
    fetchBooks();
  }, [pageSize, pageNum, sortDirection]);

  const handleNextPage = () => {
    if (pageNum < totalPages) {
      setPageNum(pageNum + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    setPageNum(1); // Reset to first page when changing sort
  };

  return (
    <>
      <h1>Books List</h1>
      <div className="sort-controls">
        <button onClick={toggleSortDirection} className="sort-button">
          Sort by Title {sortDirection === "asc" ? "↑" : "↓"}
        </button>
      </div>
      <br />
      {books.map((b) => (
        <div key={b.bookId} className="card">
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
            <p><strong>ISBN:</strong> {b.isbn}</p>
            <p>
              <strong>Book Price:</strong> ${b.price}
            </p>
          </div>
        </div>
      ))}
      <br />
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={pageNum === 1}>
          Previous
        </button>
        <span className="page-indicator">
          Page {pageNum} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={pageNum === totalPages}>
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
            setPageNum(1); // Reset to first page when changing page size
          }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
    </>
  );
}

export default BooksList;
