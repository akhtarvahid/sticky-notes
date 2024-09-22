import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { Sticky } from "../../../types/create-sticky/create-sticky.type";

interface StickyListProps {
  stickies: any;
  deleteSticky: React.Dispatch<string>;
  setSelectedSticky: React.Dispatch<Sticky>;
}

const StickyList: React.FC<StickyListProps> = ({
  stickies,
  deleteSticky,
  setSelectedSticky,
}) => {
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
