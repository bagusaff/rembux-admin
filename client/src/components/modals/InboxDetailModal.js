import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const InboxDetailModal = ({ isShow, isClose }) => {
  return (
    <Modal show={isShow} onHide={isClose}>
      <Modal.Header>
        <Modal.Title>Detail Pesan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="InputName">
            <Form.Label>Nama Pengirim</Form.Label>
            <Form.Control type="text" placeholder="Nama Anda" />
          </Form.Group>
          <Form.Group controlId="InputSubject">
            <Form.Label>Subjek</Form.Label>
            <Form.Control type="text" placeholder="Subjek" />
          </Form.Group>
          <Form.Group controlId="InputBody">
            <Form.Label>Isi pesan</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={isClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InboxDetailModal;
