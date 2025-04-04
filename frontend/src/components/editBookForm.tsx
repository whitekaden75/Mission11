import React, { useState } from "react";
import { book } from "../types/books";
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
  Book: book;
  onSuccess: () => void;
  onCancel: () => void;
}
const EditBookForm = ({ Book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<book>({ ...Book });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookId, formData);
    onSuccess();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="publisher">Publisher:</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="classification">Classification:</label>
        <input
          type="text"
          id="classification"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="pageCount">Page Count:</label>
        <input
          type="number"
          id="pageCount"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">Update Book</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default EditBookForm;
