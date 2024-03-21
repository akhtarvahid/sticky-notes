import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { BookResponse } from "../../../types/common-types";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import { LIBRARY_API } from "../../../utils/env";

const Listing: React.FC<{
  books: BookResponse[];
  deleteBook: React.Dispatch<string>;
  setSelectedBook: React.Dispatch<BookResponse>;
}> = ({ books, deleteBook, setSelectedBook }) => {
  const [deleteMsg, setDeleteMsg] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (id: string) => {
    fetch(`${LIBRARY_API}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        deleteBook(id);
        setDeleteMsg("Deleted succesfully");
      })
      .catch((err) => {
        setError("Error occured!");
      });
  };

  return (
    <>
      <h2>{deleteMsg}</h2>
      <h2>{error}</h2>
      <div data-testid="library">
        <h1>Library</h1>
        <ListGroup>
          {books?.map((book: BookResponse) => (
            <ListGroup.Item key={book.id}>
              <Card.Title>{book.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {book.author}
              </Card.Subtitle>
              <Badge bg="secondary" onClick={() => handleDelete(book.id)} pill>
                Remove
              </Badge>
              <Badge bg="secondary" onClick={() => setSelectedBook(book)} pill>
                Edit
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default Listing;
