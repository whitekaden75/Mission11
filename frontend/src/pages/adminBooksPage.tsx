import React, { useState, useEffect } from "react";
import NewBookForm from "../components/NewBookForm"; // Adjust the path as necessary
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/pagination";
import EditBookForm from "../components/editBookForm";

interface Book {
  bookId: number;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  classification: string;
  category: string;
  pageCount: number;
  price: number;
}

const AdminBooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks(pageSize, pageNum, "asc", []);
        console.log("Fetched data:", data);
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalItems / pageSize));
      } catch (error) {
        setError("Error fetching books. Please try again later.");
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageSize, pageNum]);

  const handleDeleteBook = async (bookId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book.bookId !== bookId));
    } catch (error) {
      setError("Error deleting book. Please try again later.");
      console.error("Error deleting book:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1>Admin Books Page</h1>
      {!showAddBookForm && (
        <button
          onClick={() => setShowAddBookForm(true)}
          className="btn btn-primary">
          Add Book
        </button>
      )}
      {showAddBookForm && (
        <NewBookForm
          onSuccess={() => {
            setShowAddBookForm(false);
            fetchBooks(pageSize, pageNum, "asc", []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setShowAddBookForm(false)}
        />
      )}
      {editBook && (
        <EditBookForm
          Book={editBook}
          onSuccess={() => {
            setEditBook(null);
            fetchBooks(pageSize, pageNum, "asc", []).then((data) =>
              setBooks(data.books)
            );
          }}
          onCancel={() => setEditBook(null)}
        />
      )}
      <div>
        <h2>Books List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Classification</th>
              <th>Category</th>
              <th>Page Count</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
                <td>{book.classification}</td>
                <td>{book.category}</td>
                <td>{book.pageCount}</td>
                <td>{book.price}</td>
                <td>
                  <button onClick={() => handleDeleteBook(book.bookId)}>
                    Delete
                  </button>
                  <button onClick={() => setEditBook(book)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
      </div>
    </div>
  );
};

export default AdminBooksPage;
