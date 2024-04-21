import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { Sticky } from "../../../types/create-sticky/create-sticky.type";
import { Dispatch } from "react";

const StickyList: React.FC<{
  stickies: any;
  deleteSticky: Dispatch<string>;
  setSelectedSticky: Dispatch<Sticky>;
}> = ({ stickies, deleteSticky, setSelectedSticky }) => {
  return (
    <>
      <div data-testid="sticky">
        <ListGroup>
          {stickies?.map((sticky: Sticky) => (
            <ListGroup.Item key={sticky.id}>
              <Card.Title>{sticky.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {sticky.body}
              </Card.Subtitle>
              <Badge
                bg="danger"
                data-testid="remove"
                onClick={() => deleteSticky(sticky.id)}
                pill
              >
                Remove
              </Badge>
              <Badge
                data-testid="edit"
                bg="primary"
                onClick={() => setSelectedSticky(sticky)}
                pill
              >
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
