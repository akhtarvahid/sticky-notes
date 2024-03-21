import { ListGroup, Placeholder } from "react-bootstrap";

export default function Skeleton() {
  return (
    <div style={{ marginTop: 30 }}>
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Placeholder xs={12} size="lg" bg="light" />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Placeholder xs={12} size="lg" bg="light" />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Placeholder xs={12} size="lg" bg="light" />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Placeholder xs={12} size="lg" bg="light" />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Placeholder xs={12} size="lg" bg="light" />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Placeholder xs={12} size="lg" bg="light" />
        </ListGroup.Item>
        <ListGroup.Item as="li">
          <Placeholder xs={12} size="lg" bg="light" />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
