import React from "react";
import { Alert } from "react-bootstrap";

const AlertMsg: React.FC<{
  title: string;
  subTitle: string;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ title, subTitle, setError }) => {
  return (
    <Alert variant="danger" onClose={() => setError(false)} dismissible>
      <Alert.Heading>{title}</Alert.Heading>
      <p>{subTitle}</p>
    </Alert>
  );
};
export default AlertMsg;
