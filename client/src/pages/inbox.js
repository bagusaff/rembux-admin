import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button, Container, Table } from "react-bootstrap";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import InboxDetailModal from "../components/modals/InboxDetailModal";

const Inbox = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <Layout>
      <Container fluid>
        <h3>Inbox Pesan</h3>
        <Table striped bordered hover className="text-center">
          <thead>
            <tr>
              <th>Pengirim</th>
              <th>Subjek</th>
              <th>Isi Pesan</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">a@b.com </td>
              <td className="align-middle">Otto</td>
              <td className="align-middle">Landing Page Pakdhe </td>
              <td style={{ width: "200px" }} className="align-middle">
                <Button variant="primary" className="m-1" onClick={handleShow}>
                  <FaEye />
                </Button>
                <InboxDetailModal isShow={showModal} isClose={handleClose} />
                <Button variant="danger" className="m-1">
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
};

export default Inbox;
