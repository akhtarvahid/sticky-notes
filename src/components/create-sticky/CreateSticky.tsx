import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { CreateSticky as CreateStickyTyep  } from "../../types/create-sticky/create-sticky.type";

type CreateStickyProps = {
    onCreateSticky: React.Dispatch<CreateStickyTyep>;
};

const CreateSticky: React.FC<CreateStickyProps> = ({ onCreateSticky }) => {

  const [form, setForm] = useState<CreateStickyTyep>({
    title: "",
    tags: [],
    body: "",
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
    onCreateSticky(form);
    setForm({
      title: '',
      tags: [],
      body: ''
    })
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
        <Form.Group className="mb-3" controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags"
            name="tags"
            value={form.tags.toString() || ""}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="Body"
            name="body"
            value={form.body || ""}
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
export default CreateSticky;
