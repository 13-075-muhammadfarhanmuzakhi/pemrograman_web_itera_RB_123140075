#  Sistem Manajemen Perpustakaan Sederhana
- **Nama: Muhammad Farhan Muzakhi**  
- **NIM: 123140075**  

---

## Deskripsi tugas
Proyek ini merupakan implementasi **Sistem Manajemen Perpustakaan Sederhana** menggunakan konsep **Object-Oriented Programming (OOP) Python pada pertemuan ke5**.  
Tujuan utama dari sistem ini adalah untuk mempraktikkan konsep dasar OOP seperti **class, inheritance, encapsulation, polymorphism, dan abstract class**.

---

##  Fitur Utama
1. **Menambahkan Item**  
   - User dapat menambahkan item berupa **Book** atau **Magazine** ke dalam perpustakaan.
2. **Menampilkan Item**  
   - Menampilkan daftar semua item yang tersedia di perpustakaan.
3. **Mencari Item**  
   - Pencarian berdasarkan **judul** atau **ID**.
4. **Menghapus Item**  
   - Menghapus item dari perpustakaan berdasarkan **ID**.
5. **Input User Interaktif**  
   - Data dimasukkan langsung oleh user melalui menu CLI.

---

##  Konsep OOP yang Digunakan
- **Abstract Class**: `LibraryItem` sebagai dasar untuk semua item.
- **Inheritance**: `Book` dan `Magazine` mewarisi dari `LibraryItem`.
- **Encapsulation**: Atribut penting (`__items`, `__author`, `__issue_number`) dibuat private.
- **Property Decorator**: Digunakan untuk mengakses atribut dengan aman.
- **Polymorphism**: Method `display_info()` diimplementasikan berbeda pada `Book` dan `Magazine`.

---

##  Struktur Program
- `LibraryItem` → Abstract class
- `Book` → Subclass dari `LibraryItem`
- `Magazine` → Subclass dari `LibraryItem`
- `Library` → Class untuk mengelola koleksi item
- `menu()` → Fungsi untuk menjalankan sistem interaktif berbasis CLI

---

##  Cara Menjalankan
1. Pastikan Python 3 sudah terinstall.
2. Simpan file program dengan nama `library.py`.
3. Jalankan di terminal:
   ```bash
   python library.py

