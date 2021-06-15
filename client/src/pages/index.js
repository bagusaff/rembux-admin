import React from "react";
import Layout from "../components/Layout";
import { Card, CardDeck } from "react-bootstrap";

// import { getCurrentUser } from "../services/auth.service";

const Home = () => {
  // const user = getCurrentUser();
  return (
    <Layout>
      <h3>Welcome </h3>
      <CardDeck style={{ display: "flex" }}>
        <Card
          bg="success"
          text="white"
          style={{ width: "18rem" }}
          className="m-2"
        >
          <Card.Header>Project terselesaikan</Card.Header>
          <Card.Body>
            <Card.Title>23</Card.Title>
          </Card.Body>
        </Card>
        <Card
          bg="primary"
          text="white"
          style={{ width: "18rem" }}
          className="m-2"
        >
          <Card.Header>Happy Customers</Card.Header>
          <Card.Body>
            <Card.Title>15</Card.Title>
          </Card.Body>
        </Card>
        <Card bg="info" text="white" style={{ width: "18rem" }} className="m-2">
          <Card.Header>Pesan Baru</Card.Header>
          <Card.Body>
            <Card.Title>2</Card.Title>
          </Card.Body>
        </Card>
      </CardDeck>
    </Layout>
  );
};

export default Home;
