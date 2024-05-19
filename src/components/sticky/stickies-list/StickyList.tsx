import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Badge } from "react-bootstrap";
import { Sticky } from "../../../types/create-sticky/create-sticky.type";
import { Dispatch, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const StickyList: React.FC<{
  stickies: any;
  deleteSticky: Dispatch<string>;
  setSelectedSticky: Dispatch<Sticky>;
}> = ({ stickies, deleteSticky, setSelectedSticky }) => {
  const [page, setPage] = useState(1);
  const [stickyPerPage, setStickyPerPage] = useState(
    stickies.slice(0, page * 5)
  );

  useEffect(() => {
    setStickyPerPage(stickies.slice((page - 1) * 5, page * 5));
  }, [page]);

  let active = page;
  let items = [];
  for (let number = 1; number <= Math.ceil(stickies.length / 5); number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <>
      <div data-testid="sticky">
        <Pagination>{items}</Pagination>
        <ListGroup>
          {stickyPerPage?.map((sticky: Sticky) => (
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
