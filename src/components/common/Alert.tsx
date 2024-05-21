import React from 'react'
import { Alert } from "react-bootstrap";

 
const AlertMsg: React.FC<{
    title: string;
    subTitle: string;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    title, 
    subTitle,
    setError
}) =>  {
  return (
    <Alert variant="danger" onClose={() => setError(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Please enter a title for your sticky.</p>
        </Alert>
  )
}
export default AlertMsg;
