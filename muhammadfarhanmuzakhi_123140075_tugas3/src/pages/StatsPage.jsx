import React from "react";
import { useBooks } from "../context/BookContext";

function StatsPage() {
  const { books } = useBooks();

  const total = books.length;
  const countByStatus = books.reduce((acc, book) => {
    acc[book.status] = (acc[book.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ padding: "20px" }}>
      <h2>Statistik Buku</h2>
      <p style={{ fontSize: "1.2em" }}>
        Total Buku Terdaftar: <strong>{total}</strong>
      </p>
      <hr />
      <h3>Rincian Status:</h3>
      <p>
        📚 Dimiliki: <strong>{countByStatus.milik || 0}</strong>
      </p>
      <p>
        ⏳ Sedang Dibaca: <strong>{countByStatus.baca || 0}</strong>
      </p>
      <p>
        🛒 Ingin Dibeli: <strong>{countByStatus.beli || 0}</strong>
      </p>
    </div>
  );
}

export default StatsPage;
