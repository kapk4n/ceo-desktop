// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { store } from '../store';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CreatingDesk = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleLogin = async (e) => {
    // e.preventDefault();
    handleClose();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.post('http://localhost:8001/api/lists/', 
      {
        title, description
      });
      // Handle successful login
      location.reload()
      // store.addToken(response.data.token)
      // sessionStorage.setItem("token", response.data.token)
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
<>
      <Button variant="primary" onClick={handleShow}>
        Create the desk
      </Button>

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
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button variant="secondary" className='button' type="submit">Login</Button>
    </form>
      </Modal>
    </>
  );
};

export default CreatingDesk;
