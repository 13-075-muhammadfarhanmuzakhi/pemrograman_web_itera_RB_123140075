from abc import ABC, abstractmethod

# Abstract Class
class LibraryItem(ABC):
    def __init__(self, item_id, title):
        self._item_id = item_id
        self._title = title

    @property
    def title(self):
        return self._title

    @property
    def item_id(self):
        return self._item_id

    @abstractmethod
    def display_info(self):
        pass


class Book(LibraryItem):
    def __init__(self, item_id, title, author):
        super().__init__(item_id, title)
        self.__author = author

    @property
    def author(self):
        return self.__author

    def display_info(self):
        return f"[📘 Book] ID: {self.item_id} | Title: {self.title} | Author: {self.author}"


class Magazine(LibraryItem):
    def __init__(self, item_id, title, issue_number):
        super().__init__(item_id, title)
        self.__issue_number = issue_number

    @property
    def issue_number(self):
        return self.__issue_number

    def display_info(self):
        return f"[📰 Magazine] ID: {self.item_id} | Title: {self.title} | Issue: {self.issue_number}"


class Library:
    def __init__(self):
        self.__items = []

    def add_item(self, item: LibraryItem):
        self.__items.append(item)

    def show_items(self):
        if not self.__items:
            print("\n⚠️ Tidak ada item di perpustakaan.\n")
        else:
            print("\n📚 Daftar Item di Perpustakaan:")
            print("-" * 50)
            for item in self.__items:
                print(item.display_info())
            print("-" * 50)

    def search_item(self, keyword):
        results = []
        for item in self.__items:
            if keyword.lower() in item.title.lower() or keyword == str(item.item_id):
                results.append(item.display_info())
        return results

    def remove_item(self, item_id):
        for item in self.__items:
            if item.item_id == item_id:
                self.__items.remove(item)
                print(f"\n✅ Item dengan ID {item_id} berhasil dihapus.\n")
                return
        print(f"\n❌ Item dengan ID {item_id} tidak ditemukan.\n")


# Menu interaktif
def menu():
    library = Library()

    while True:
        print("\n===== 📖 Sistem Manajemen Perpustakaan =====")
        print("1. Tambah Item")
        print("2. Lihat Semua Item")
        print("3. Cari Item")
        print("4. Hapus Item")
        print("5. Keluar")
        choice = input("Pilih menu (1-5): ")

        if choice == "1":
            try:
                item_id = int(input("Masukkan ID: "))
                title = input("Masukkan Judul: ")
                item_type = input("Jenis (book/magazine): ").lower()

                if item_type == "book":
                    author = input("Masukkan Author: ")
                    library.add_item(Book(item_id, title, author))
                    print("\n✅ Book berhasil ditambahkan!\n")
                elif item_type == "magazine":
                    issue = input("Masukkan Issue Number: ")
                    library.add_item(Magazine(item_id, title, issue))
                    print("\n✅ Magazine berhasil ditambahkan!\n")
                else:
                    print("\n❌ Jenis item tidak valid.\n")
            except ValueError:
                print("\n⚠️ ID harus berupa angka!\n")

        elif choice == "2":
            library.show_items()

        elif choice == "3":
            keyword = input("Masukkan judul atau ID untuk dicari: ")
            results = library.search_item(keyword)
            if results:
                print("\n🔍 Hasil Pencarian:")
                for r in results:
                    print(r)
            else:
                print("\n❌ Item tidak ditemukan.\n")

        elif choice == "4":
            try:
                item_id = int(input("Masukkan ID item yang ingin dihapus: "))
                library.remove_item(item_id)
            except ValueError:
                print("\n⚠️ ID harus berupa angka!\n")

        elif choice == "5":
            print("\n👋 Terima kasih telah menggunakan sistem perpustakaan!\n")
            break

        else:
            print("\n⚠️ Pilihan tidak valid, coba lagi.\n")


if __name__ == "__main__":
    menu()
