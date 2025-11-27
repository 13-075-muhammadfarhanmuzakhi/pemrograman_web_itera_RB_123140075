# ===========================================
# Program Pengelolaan Data Nilai Mahasiswa
# ===========================================

# Data awal (minimal 5 mahasiswa)
mahasiswa = [
    {"nama": "zaky ghozy", "nim": "123001", "uts": 80, "uas": 85, "tugas": 90},
    {"nama": "muhammad farhan", "nim": "123002", "uts": 90, "uas": 95, "tugas": 100},
    {"nama": "anisa nabila cbub", "nim": "123003", "uts": 60, "uas": 65, "tugas": 70},
    {"nama": "aliya amara ananta", "nim": "123004", "uts": 90, "uas": 95, "tugas": 85},
    {"nama": "andika brokodock", "nim": "123005", "uts": 50, "uas": 55, "tugas": 60}
]

# ===== Fungsi Perhitungan =====

def hitung_nilai_akhir(uts, uas, tugas):
    return (uts * 0.30) + (uas * 0.40) + (tugas * 0.30)

def tentukan_grade(nilai):
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"

# ===== Menampilkan Data =====

def tampilkan_data():
    print("\n===== DATA NILAI MAHASISWA =====")
    print("{:<15} {:<10} {:<10} {:<10} {:<10} {:<10} {:<7}".format(
        "Nama", "NIM", "UTS", "UAS", "TUGAS", "AKHIR", "GRADE"))
    print("-" * 80)

    for m in mahasiswa:
        nilai_akhir = hitung_nilai_akhir(m["uts"], m["uas"], m["tugas"])
        grade = tentukan_grade(nilai_akhir)
        print("{:<15} {:<10} {:<10} {:<10} {:<10} {:<10.2f} {:<7}".format(
            m["nama"], m["nim"], m["uts"], m["uas"], m["tugas"], nilai_akhir, grade))

# ===== Tambah Mahasiswa =====

def tambah_data():
    print("\n=== Input Mahasiswa Baru ===")
    nama = input("Nama: ")
    nim = input("NIM: ")
    uts = float(input("Nilai UTS: "))
    uas = float(input("Nilai UAS: "))
    tugas = float(input("Nilai Tugas: "))

    mahasiswa.append({"nama": nama, "nim": nim, "uts": uts, "uas": uas, "tugas": tugas})
    print("\nData berhasil ditambahkan!")

# ===== Nilai Tertinggi / Terendah =====

def nilai_ekstrem():
    nilai_dengan_akhir = [
        (m, hitung_nilai_akhir(m["uts"], m["uas"], m["tugas"])) for m in mahasiswa
    ]
    tertinggi = max(nilai_dengan_akhir, key=lambda x: x[1])
    terendah = min(nilai_dengan_akhir, key=lambda x: x[1])

    print("\nMahasiswa Nilai Tertinggi:", tertinggi[0]["nama"], "-", tertinggi[1])
    print("Mahasiswa Nilai Terendah:", terendah[0]["nama"], "-", terendah[1])

# ===== Filter Berdasarkan Grade =====

def filter_grade():
    grade_target = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ").upper()
    print(f"\nMahasiswa dengan grade {grade_target}:")
    for m in mahasiswa:
        nilai_akhir = hitung_nilai_akhir(m["uts"], m["uas"], m["tugas"])
        if tentukan_grade(nilai_akhir) == grade_target:
            print(f"- {m['nama']} ({m['nim']}) | Nilai: {nilai_akhir:.2f}")

# ===== Rata-rata Nilai Kelas =====

def rata_rata_kelas():
    total = sum(hitung_nilai_akhir(m["uts"], m["uas"], m["tugas"]) for m in mahasiswa)
    rata = total / len(mahasiswa)
    print(f"\nRata-rata Nilai Kelas: {rata:.2f}")

# ===== Menu Program =====

while True:
    print("\n===== MENU =====")
    print("1. Tampilkan Data")
    print("2. Tambah Data Mahasiswa")
    print("3. Cari Nilai Tertinggi & Terendah")
    print("4. Filter Berdasarkan Grade")
    print("5. Hitung Rata-rata Nilai Kelas")
    print("6. Keluar")

    pilihan = input("Pilih menu (1-6): ")

    if pilihan == "1":
        tampilkan_data()
    elif pilihan == "2":
        tambah_data()
    elif pilihan == "3":
        nilai_ekstrem()
    elif pilihan == "4":
        filter_grade()
    elif pilihan == "5":
        rata_rata_kelas()
    elif pilihan == "6":
        print("\nProgram selesai. Terima kasih!")
        break
    else:
        print("Pilihan tidak valid, coba lagi!")
