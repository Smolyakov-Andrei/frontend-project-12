import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const ChatNavbar = () => {
  const auth = useAuth();

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {auth.user && <Button onClick={auth.logOut}>Выйти</Button>}
      </Container>
    </Navbar>
  );
};

export default ChatNavbar;
