import React, { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";

function BookForm({ currentBook, onFinishEdit }) {
  const { addBook, updateBook } = useBooks();
  const [judul, setJudul] = useState("");
  const [penulis, setPenulis] = useState("");
  const [status, setStatus] = useState("beli");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentBook) {
      setJudul(currentBook.judul);
      setPenulis(currentBook.penulis);
      setStatus(currentBook.status);
    }
  }, [currentBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!judul.trim() || !penulis.trim()) {
      setError("Judul dan Penulis wajib diisi!");
      return;
    }

    const bookData = { judul: judul.trim(), penulis: penulis.trim(), status };

    if (currentBook) {
      updateBook({ ...currentBook, ...bookData });
      onFinishEdit();
    } else {
      addBook(bookData);
    }

    // Reset form
    setJudul("");
    setPenulis("");
    setStatus("beli");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        padding: "15px",
        border: "1px solid #ccc",
      }}
    >
      <h3 style={{ marginTop: 0 }}>
        {currentBook ? "Edit Buku" : "Tambah Buku Baru"}
      </h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Judul Buku"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <input
        type="text"
        placeholder="Penulis"
        value={penulis}
        onChange={(e) => setPenulis(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <label style={{ marginRight: "10px" }}>
        Status:
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginLeft: "5px" }}
        >
          <option value="beli">Ingin Dibeli</option>
          <option value="baca">Sedang Dibaca</option>
          <option value="milik">Dimiliki</option>
        </select>
      </label>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        {currentBook ? "Simpan Perubahan" : "Tambah Buku"}
      </button>
      {currentBook && (
        <button
          type="button"
          onClick={onFinishEdit}
          style={{ marginLeft: "10px", padding: "10px" }}
        >
          Batal
        </button>
      )}
    </form>
  );
}

export default BookForm;
