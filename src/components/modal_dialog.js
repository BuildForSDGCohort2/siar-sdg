import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
function Dialog(props) {
  const [show, setShow] = useState(props.show);

  const handleActionClick = () => props.onAction();
  const handleClose = () => {
    setShow(false);
    props.onClose();
  };
  // const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
          Launch static backdrop modal
        </Button>
   */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleActionClick}>
            {props.action}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Dialog;
