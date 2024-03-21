import { useMemo, useState } from "react";
import { useDeleteBook, usePostBook, useUpdateBook } from "./hooks/useCrud";
import BookList from "./BookList";
import AddBook from "./AddBook";
import { Book, BookResponse } from "../../types/common-types";
import useSWR, { mutate } from "swr";
import "./style.css";
import EditModal from "./EditModal";
import { LIBRARY_API } from "../../utils/env";

const CrudWithSWR = () => {
  const [selected, setSelected] = useState<BookResponse | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const { data: books } = useSWR(LIBRARY_API);
  const { addBookToStore, createError } = usePostBook();
  const { updateBookToStore, updateError, isUpdating } = useUpdateBook();
  const { deleteBookFromStore, deleteError } = useDeleteBook();

  const booksFromStore = useMemo(() => {
    return books || [];
  }, [books]);

  const handleAddBook = async (book: Book) => {
    try {
      mutate(LIBRARY_API, [...booksFromStore, book], false);
      await addBookToStore(book);
    } catch (err) {}
  };
  const handleUpdateBook = async (book: BookResponse) => {
    const modifiedBooks = booksFromStore.map((b: BookResponse) =>
      b.id === book.id ? book : b
    );
    try {
      mutate(LIBRARY_API, [...modifiedBooks], false);
      await updateBookToStore({
        requestBody: book,
        queryParams: { id: book.id },
      });
      setShowPopup(false);
    } catch (err) {}

    setSelected(null);
  };
  const handleDeleteBook = async (id: string) => {
    const filtered = booksFromStore.filter((b: BookResponse) => b.id !== id);
    try {
      mutate(LIBRARY_API, [...filtered], false);
      await deleteBookFromStore(id);
    } catch (err) {}
  };

  if (createError || updateError || deleteError) {
    return <h1>Something happened wrong!</h1>;
  }

  return (
    <div className="main">
      <div className="wrapper">
        <h2>Add Book To Store</h2>
        <AddBook onAddBook={handleAddBook} />
        {showPopup && (
          <EditModal
            onUpdateBook={handleUpdateBook}
            selected={selected}
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            isUpdating={isUpdating}
          />
        )}

        <BookList
          title="Books Available"
          books={[...booksFromStore].reverse()}
          setSelected={setSelected}
          handleDeleteBook={handleDeleteBook}
          setShowPopup={setShowPopup}
        />
      </div>
    </div>
  );
};
export default CrudWithSWR;
