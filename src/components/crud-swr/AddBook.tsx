import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Book } from "../../types/common-types";

type CreateProps = {
  onAddBook: React.Dispatch<Book>;
};

const AddBook: React.FC<CreateProps> = ({ onAddBook }) => {
  const [form, setForm] = useState<Book>({
    title: "",
    author: "",
    price: "",
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onAddBook(form);
    setForm({
      title: "",
      author: "",
      price: "",
    });
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            onChange={handleFormChange}
            value={form.title || ""}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter author"
            name="author"
            value={form.author || ""}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Price"
            name="price"
            value={form.price || ""}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          name="Submit"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </Form>
    </>
  );
};
export default AddBook;
