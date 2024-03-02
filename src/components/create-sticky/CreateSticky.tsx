import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import {
  Sticky,
  StickyResponse,
} from "../../types/create-sticky/create-sticky.type";
import { COLORS } from "../../utils/constants";

type CreateStickyProps = {
  onCreateSticky: React.Dispatch<Sticky>;
  onUpdateSticky: React.Dispatch<Sticky>;
  selectedSticky: StickyResponse | null;
};

const CreateSticky: React.FC<CreateStickyProps> = ({
  onCreateSticky,
  onUpdateSticky,
  selectedSticky,
}) => {
  const [form, setForm] = useState<Sticky>({
    title: "",
    tag: "",
    body: "",
  });

  useEffect(() => {
    setForm({
      title: selectedSticky?.title || "",
      tag: selectedSticky?.tag || "",
      body: selectedSticky?.body || "",
    });
  }, [selectedSticky]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formProps = {
      ...form,
      id: Math.floor(Math.random() * 1000),
    };
    onCreateSticky(formProps);
    setForm({
      title: "",
      tag: "",
      body: "",
    });
  };

  const updateHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formProps = {
      ...form,
      id: selectedSticky?.id || "",
    };
    onUpdateSticky(formProps);
    setForm({
      title: "",
      tag: "",
      body: "",
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
        <Form.Group className="mb-3" controlId="tag">
          <Form.Label>Tag</Form.Label>
          <Form.Select
            name="tag"
            aria-label="tag"
            onChange={handleSelectChange}
            value={form.tag || ""}
          >
            <option>Select tag color</option>
            {COLORS.filter((color) => color.name.length < 5).map((color) => (
              <option key={color.name} value={color.name}>
                {color.name}
              </option>
            ))}
          </Form.Select>
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
        {!selectedSticky ? (
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
            name="Submit"
            onClick={updateHandler}
          >
            Update
          </Button>
        )}
      </Form>
    </>
  );
};
export default CreateSticky;
