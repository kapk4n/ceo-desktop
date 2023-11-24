import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function NotLogedNav() {
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [login2, setUsernameSign] = useState('');
  const [password2, setPasswordSign] = useState('');
  const [phone2, setPhoneSign] = useState('');
  const [email2, setEmaiSign] = useState('');

  const [showSign, setShowSign] = useState(false);

  const handleCloseSign = () => setShowSign(false);
  const handleShowSign = () => setShowSign(true);


  const handleSign = async (e) => {
    e.preventDefault();
    handleCloseSign();
    const status = 'online'
    try {
      var login = login2
      const phone = phone2
      var password = password2
      const email = email2
      const response = await axios.post('http://localhost:8001/auth/sign-up', { login, phone, password, email, status });
      // Handle successful login
      console.log(response.data);
      // store.addToken(response.data.token)
      // sessionStorage.setItem("token", response.data.token)
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    handleClose();

    try {
      const response = await axios.post('http://localhost:8001/auth/sign-in', { login, password });
      // Handle successful login
      console.log(response.data);
      // store.addToken(response.data.token)
      sessionStorage.setItem("token", response.data.token)
      window.location.href = 'http://localhost:5173/desks'
    // redirect("http://localhost:8001/")
      
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (

    <>
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="desks">desks</Nav.Link>
          </Nav>
          <Nav>
          <Button onClick={handleShow}>Sign In</Button>
            <Button onClick={handleShowSign}>Sign Up</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>



        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> 
        <form onSubmit={handleLogin}>
      <input
        className="inputBox"
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="secondary" className='button' type="submit">Login</Button>
    </form>
      </Modal>



      <Modal
        show={showSign}
        onHide={handleCloseSign}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> 
      <form onSubmit={handleSign}>
      <input
        className="inputBox"
        type="text"
        placeholder="Login"
        value={login2}
        onChange={(e) => setUsernameSign(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="phone"
        value={phone2}
        onChange={(e) => setPhoneSign(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="email"
        value={email2}
        onChange={(e) => setEmaiSign(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Password"
        value={password2}
        onChange={(e) => setPasswordSign(e.target.value)}
      />
      <Button variant="secondary" className='button' type="submit">Sign</Button>
    </form>
    </Modal>



      </>

  );
}

export default NotLogedNav;