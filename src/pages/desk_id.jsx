import '../App.css'
import CardTask from '../shares/cards_task.jsx'
import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CreatingTask from './task_creating'
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const DesksId = observer(() => {

  // const queryString = window.location.href;
  // const desk_id = queryString.slice(-1)
  const [key, setKey] = useState('home');
  let { id } = useParams();
  // taskStore.showTasks(desk_id)
  // console.log(id)
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacks_2, setFeedbacks_2] = useState([]);

  useEffect(() => {

    const fetchArticles = async () => {
      setFeedbacks([]);
      // const url = 'https://url.abc.com/';
      const api_response = axios.get(`http://localhost:8001/api/tasks/all/${id}`, {
        headers: {
          "access-control-allow-origin":"http://localhost:8001/",
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      let data = await api_response;
        setFeedbacks(data);
    }
    fetchArticles()
          // setInterval(fetchArticles(), 2000)
    }, [])

    const data = {feedbacks};

    useEffect(() => {

      const ShowMyTasks = async () => {
        setFeedbacks_2([]);
        // const url = 'https://url.abc.com/';
        const api_response = axios.get(`http://localhost:8001/api/tasks/byid/${id}`, {
          headers: {
            "access-control-allow-origin":"http://localhost:8001/",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        let data_2 = await api_response;
          setFeedbacks_2(data_2);
      }
      ShowMyTasks()
            // setInterval(fetchArticles(), 2000)
      }, [])


    const data_own_tasks = {feedbacks_2}; 

    // console.log(data['feedbacks'].data)
    // console.log(data_own_tasks)

  // console.log(JSON.stringify(taskStore.tasksFromDesk))
  // if (data.feedbacks.data != undefined){
  //   console.log(data['feedbacks'].data)
  // }
    function ar(data){
      if (data != undefined & data != null){
        // console.log(data)

        if (data.data != undefined) {
          console.log(data)

          return true
        }
         // console.log(data)
      }
    }

  return (
    
    <div>
      <CreatingTask />

<Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="All tasks">
        {ar(data.feedbacks.data) ? Array(data.feedbacks.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data.feedbacks.data['data'][i]}/>) : ''} 

      </Tab>
      <Tab eventKey="profile" title="My Tasks">
        {ar(data_own_tasks.feedbacks_2.data) ? Array(data_own_tasks.feedbacks_2.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data_own_tasks.feedbacks_2.data['data'][i]}/>) : ''} 
        {/* {ar(data_own_tasks.feedbacks_2.data) ? console.log(1) : ''}  */}

      </Tab>
    </Tabs>

      {/* <Button onClick={ShowMyTasks}> My tasks </Button> */}
    {/* {Array(taskStore.tasksFromDesk.length).fill(true).map((_, i) => <CardTask key={i} {...taskStore.tasksFromDesk[i]}/>)}  */}
    
    </div>
  )
});

export default DesksId
