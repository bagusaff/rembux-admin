import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { login } from "../services/auth.service";
const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(username, password).then(() => {
        history.push("/");
        window.location.reload();
        setLoading(false);
      });
    } catch (err) {
      setLoading(false);
      return err.message;
    }
  };
  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleLogin}>
          <h3>Log in</h3>
          <Form.Group as={Row} controlId="inputUsername">
            <Form.Label column sm={2} style={{ margin: "5px" }}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="inputPassword">
            <Form.Label column sm={2} style={{ margin: "5px" }}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="inputRemember">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit" disabled={loading}>
                {loading && <Spinner animation="border" variant="light" />}
                <span>Sign in</span>
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, 1);
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
