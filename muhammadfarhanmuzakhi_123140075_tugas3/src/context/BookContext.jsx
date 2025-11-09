import React, { createContext, useContext, useMemo, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage("personalBooks", []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const addBook = (newBook) => {
    const bookWithId = {
      id: Date.now(),
      status: "beli", // Default status
      ...newBook,
    };
    setBooks((prevBooks) => [...prevBooks, bookWithId]);
  };

  const deleteBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const updateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? { ...book, ...updatedBook } : book
      )
    );
  };

  // Logika Filter dan Search
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch =
        book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.penulis.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || book.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [books, searchTerm, filterStatus]);

  const contextValue = useMemo(
    () => ({
      books,
      filteredBooks,
      addBook,
      deleteBook,
      updateBook,
      searchTerm,
      setSearchTerm,
      filterStatus,
      setFilterStatus,
    }),
    [books, filteredBooks, searchTerm, filterStatus]
  );

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
}

export function useBooks() {
  return useContext(BookContext);
}
