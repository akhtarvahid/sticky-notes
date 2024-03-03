import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect, useState } from "react";
import { isFieldsEmpty } from "../helper/helper";
import { Book, BookResponse } from "../../../types/common-types";
import { LIBRARY_API } from "../../../utils/env";

type CreateProps = {
  onAddBook: React.Dispatch<BookResponse>;
  selectedBook: BookResponse | null | undefined;
  setSelectedBook: React.Dispatch<BookResponse | null>;
  onUpdateBook: React.Dispatch<BookResponse>;
};

const initialState = {
  title: "",
  author: "",
  price: "",
};
const Create: React.FC<CreateProps> = ({
  onAddBook,
  selectedBook,
  setSelectedBook,
  onUpdateBook,
}) => {
  const [form, setForm] = useState<Book>(initialState);
  const [responseMsg, setResponseMsg] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  useEffect(() => {
    setForm({
      title: selectedBook?.title || "",
      author: selectedBook?.author || "",
      price: selectedBook?.price || "",
    });
  }, [selectedBook]);

  useEffect(() => {
    setTimeout(() => {
       setResponseMsg('');
       setError('');
    }, 5000);
  }, [error, responseMsg])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setForm((values) => {
      return {
        ...values,
        [e.target.name]: value,
      };
    });
  };

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isFieldsEmpty(form))
      fetch(LIBRARY_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((res) => {
          onAddBook(res);
          setForm(initialState);
          setResponseMsg("Successfully created");
        })
        .catch(() => setError("Something went wrong!"));
  };

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // Making PUT API call to update data
      const response = await fetch(`${LIBRARY_API}/${selectedBook?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      onUpdateBook(result);
      setResponseMsg("Updated succesfully");

      if (!result) {
        setError("Error occured while updation!");
      }
    } catch (error) {}
    setSelectedBook(null);
  };

  return (
    <>
      <div>{responseMsg}</div>
      <div>{error}</div>
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
        {!selectedBook ? (
          <Button
            variant="primary"
            type="submit"
            name="Submit"
            onClick={submitHandler}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="primary"
            type="submit"
            name="Update"
            onClick={handleUpdate}
          >
            Update
          </Button>
        )}
      </Form>
    </>
  );
};
export default Create;
