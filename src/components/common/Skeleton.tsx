import React from "react";
import { ListGroup, Placeholder } from "react-bootstrap";

type Props = {};

export default function Skeleton({}: Props) {
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
