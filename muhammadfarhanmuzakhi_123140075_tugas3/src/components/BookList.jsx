import React, { useState } from "react";
import { useBooks } from "../context/BookContext";
import BookForm from "./BookForm";

function BookList() {
  const {
    filteredBooks,
    deleteBook,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
  } = useBooks();
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Daftar Buku ({filteredBooks.length} item)</h2>

      {/* Form Edit/Tambah */}
      <BookForm
        currentBook={editingBook}
        onFinishEdit={() => setEditingBook(null)}
      />

      {/* Search & Filter */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Cari Judul/Penulis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="all">Semua Status</option>
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="milik">Dimiliki</option>
        </select>
      </div>

      {/* Menampilkan Daftar Buku */}
      {filteredBooks.length === 0 ? (
        <p>Tidak ada buku yang ditemukan.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredBooks.map((book) => (
            <li
              key={book.id}
              style={{
                border: "1px solid #eee",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h4>{book.judul}</h4>
              <p>Penulis: {book.penulis}</p>
              <p>
                Status: <strong>{book.status.toUpperCase()}</strong>
              </p>
              <button
                onClick={() => handleEdit(book)}
                style={{ marginRight: "10px", padding: "5px" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                style={{
                  padding: "5px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                }}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
