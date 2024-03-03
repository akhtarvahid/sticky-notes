import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { Sticky } from "../../types/create-sticky/create-sticky.type";

const StickyList: React.FC<{
  stickies: any;
  deleteSticky: React.Dispatch<string>;
  setSelectedSticky: React.Dispatch<Sticky>;
}> = ({ stickies, deleteSticky, setSelectedSticky }) => {
  return (
    <>
      <div data-testid="sticky">
        <h1>Sticky</h1>
        <ListGroup>
          {stickies?.map((sticky: Sticky) => (
            <ListGroup.Item key={sticky.id}>
              <Card.Title>{sticky.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {sticky.body}
              </Card.Subtitle>
              <Badge bg="danger" onClick={() => deleteSticky(sticky.id)} pill>
                Remove
              </Badge>
              <Badge
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
