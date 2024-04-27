import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ToastMessage({ show, setShow }: Props) {
  return (
    <ToastContainer position="top-end">
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={4000}
        style={{ height: 85 }}
        animation={true}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>Successfully created</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
