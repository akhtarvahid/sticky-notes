import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {
  ChangeEvent,
  Dispatch,
  useEffect,
  useState,
  MouseEvent,
} from "react";
import {
  InputSticky,
  Sticky,
} from "../../../types/create-sticky/create-sticky.type";
import { COLORS } from "../../../utils/constants";

export interface CreateStickyProps {
  onCreateSticky: Dispatch<InputSticky>;
  onUpdateSticky: Dispatch<InputSticky>;
  selectedSticky: Sticky | null;
}

const initState = {
  title: "",
  tag: "",
  body: "",
};

const CreateSticky: React.FC<CreateStickyProps> = ({
  onCreateSticky,
  onUpdateSticky,
  selectedSticky,
}) => {
  const [form, setForm] = useState<InputSticky>(initState);

  useEffect(() => {
    setForm({
      title: selectedSticky?.title || "",
      tag: selectedSticky?.tag || "",
      body: selectedSticky?.body || "",
    });
  }, [selectedSticky]);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const formProps = {
      ...form,
      id: Math.floor(Math.random() * 1000),
    };

    onCreateSticky(formProps);
    setForm(initState);
  };

  const updateHandler = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const formProps = {
      ...form,
      id: selectedSticky?.id || "",
    };
    onUpdateSticky(formProps);
    setForm(initState);
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          data-testid="sticky-title"
          type="text"
          placeholder="Enter sticky title"
          name="title"
          onChange={handleFormChange}
          value={form.title || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="tag">
        <Form.Label>Tag</Form.Label>
        <Form.Select
          name="tag"
          data-testid="sticky-tag"
          aria-label="tag"
          onChange={handleSelectChange}
          value={form.tag || ""}
        >
          <option data-testid="color" value="">
            Select tag color
          </option>
          {COLORS.filter((color) => color.name.length < 5).map((color) => (
            <option data-testid="color" key={color.name} value={color.name}>
              {color.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="body">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          placeholder="Enter the details of sticky note"
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
          name="Update"
          onClick={updateHandler}
        >
          Update
        </Button>
      )}
    </Form>
  );
};
export default CreateSticky;
