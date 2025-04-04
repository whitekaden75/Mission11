import { book } from "../types/books";

interface FetchBooksResponse {
  books: book[];
  totalItems: number;
}

const API_URL =
  "https://mission13-white-backend-frb5d8aha7c5eabp.eastus-01.azurewebsites.net/api/books";
export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  sortDirection: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  const categoryParams = selectedCategories
    .map((category) => `categories=${encodeURIComponent(category)}`)
    .join("&");

  const url = `https://mission13-white-backend-frb5d8aha7c5eabp.eastus-01.azurewebsites.net/api/books?bookhowmany=${pageSize}&pageNum=${pageNum}&sortDirection=${sortDirection}${
    selectedCategories.length ? `&${categoryParams}` : ""
  }`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching books: ${response.statusText}`);
    }

    const data: FetchBooksResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }
};
export const addBook = async (bookData: book): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookData),
    });
    if (!response.ok) {
      throw new Error(`Error adding book: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to add book:", error);
    throw error;
  }
};
export const updateBook = async (
  bookId: number,
  updatedBookData: book
): Promise<book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBookData),
    });
    if (!response.ok) {
      throw new Error(`Error updating book: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to update book:", error);
    throw error;
  }
};
export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting book: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Failed to delete book:", error);
    throw error;
  }
};
