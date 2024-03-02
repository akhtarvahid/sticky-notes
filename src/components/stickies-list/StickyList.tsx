import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { useState } from "react";
import { StickyResponse } from "../../types/create-sticky/create-sticky.type";
import { BASE_STICKY_API } from "../../utils/env";

const StickyList: React.FC<{
  stickies: any;
  deleteSticky: React.Dispatch<string>;
  setSelectedSticky: React.Dispatch<StickyResponse>;
}> = ({ stickies, deleteSticky, setSelectedSticky }) => {
  const [deleteMsg, setDeleteMsg] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (id: string) => {};

  return (
    <>
      <h2>{deleteMsg}</h2>
      <h2>{error}</h2>
      <div data-testid="library">
        <h1>Library</h1>
        <ListGroup>
          {stickies?.map((sticky: StickyResponse) => (
            <ListGroup.Item key={sticky.id}>
              <Card.Title>{sticky.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {sticky.body}
              </Card.Subtitle>
              <Badge bg="secondary" onClick={() => handleDelete(sticky.id)} pill>
                Remove
              </Badge>
              <Badge bg="secondary" onClick={() => setSelectedSticky(sticky)} pill>
                Edit
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default StickyList;
