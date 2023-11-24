// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Select from 'react-select'

const CreatingTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority2, setPriority] = useState('');
  // const [desk_id, setDeskId] = useState('');
  const [employee_id2, setEmployeeId] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const login = employee_id_2
  const { id } = useParams();


  const options = [
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Very high', label: 'Very high' },
    { value: 'Low', label: 'Low' }
  ]

  const handleLogin = async (e) => {
    // const queryString = window.location.href;
    const desk_id = parseInt(id)
    // taskStore.showTasks(desk_id)
    // console.log(id)
    e.preventDefault();
    handleClose();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const priority = priority2['value']
      const login = employee_id2
      const response = await axios.post('http://localhost:8001/api/tasks/', 
      {
        title, description, desk_id, login, priority
      });
      // Handle successful login
      console.log(response.data);
      location.reload()
      // store.addToken(response.data.token)
      // localStorage.setItem("token", response.data.token)
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
<>
      <Button variant="primary" onClick={handleShow}>
        Create the Task
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
      {/* <input
        className="inputBox"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> */}
      <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

            {/* <input
        className="inputBox"
        type="text"
        placeholder="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      /> */}
                  <Select options={options} 
      onChange={setPriority}
      />

            {/* <input
        className="inputBox"
        type="text"
        placeholder="employee_id_2"
        value={employee_id2}
        onChange={(e) => setEmployeeId(e.target.value)}
      /> */}
      <Form.Control type="text" placeholder="Employee" onChange={(e) => setEmployeeId(e.target.value)} />

      {/* <input
        className="inputBox"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}
      <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <Button variant="secondary" className='button' type="submit">Create Task</Button>
    </form>
      </Modal>
    </>
  );
};

export default CreatingTask;
