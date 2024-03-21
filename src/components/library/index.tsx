import { useEffect, useState } from "react";
import Listing from "./Listing/Listing";
import Create from "./create/create";
import { getBookLibrary } from "./helper/helper";
import { BookResponse } from "../../types/common-types";

function Library() {
  const [bookStore, setBookStore] = useState<BookResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookResponse | null>();

  useEffect(() => {
    const fetchData = async () => {
      const books = await getBookLibrary();
      setBookStore(books?.reverse());
    };
    fetchData();
  }, []);

  const handleAddBook = async (newBook: any) => {
    setIsLoading(true);
    setBookStore((prevBooks: BookResponse[]) => [newBook, ...prevBooks]);
    setIsLoading(false);
  };
  const handleDeleteBook = (id: string) => {
    setBookStore((prevBooks: BookResponse[]) =>
      prevBooks.filter((book) => book.id !== id)
    );
  };

  const handleUpdateBook = (book: BookResponse) => {
    setBookStore((prevBooks: BookResponse[]) =>
      prevBooks.map((b) => b.id === book.id ? book : b)
    );
  }

  return (
    <>
      {isLoading && <h1 style={{ color: "green" }}>Loading...</h1>}
      <div data-testid="library">
        <h1>Library Form</h1>
        <Create
          onAddBook={handleAddBook}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          onUpdateBook={handleUpdateBook}
        />
        <Listing
          books={bookStore}
          deleteBook={handleDeleteBook}
          setSelectedBook={setSelectedBook}
        />
      </div>
    </>
  );
}

export default Library;
