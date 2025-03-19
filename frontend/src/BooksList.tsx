import { useEffect, useState } from "react";
import { book } from "./types/books";

function BooksList() {
  const [books, setBooks] = useState<book[]>([]);
  useEffect(() => {
    const fetchbook = async () => {
      const response = await fetch("https://localhost:5000/api/books");
      const data = await response.json();
      setBooks(data);
    };

    fetchbook();
  }, []);
  return (
    <>
      <h1>Books List</h1>
      <br />
      {books.map((b, index) => (
        <div key={index}>
          <h2>{b.title}</h2>
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
            <strong>Book Price:</strong> ${b.price}
          </p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default BooksList;
