import '../App.css'
import CardTask from '../shares/cards_task.jsx'
import React, {useState, useEffect} from 'react';
import { taskStore } from '../store_tasks';
import {useParams} from "react-router-dom";
import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CreatingTask from './task_creating'
import OffCanvasExample from './task_page'


// import { store } from '../store';

// const desk_id = new URLSearchParams(window.location.search).get("id")

const DesksId = observer(() => {

  // const queryString = window.location.href;
  // const desk_id = queryString.slice(-1)
  let { id } = useParams();
  // taskStore.showTasks(desk_id)
  // console.log(id)
  const [feedbacks, setFeedbacks] = useState([]);
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

    // console.log(data['feedbacks'].data)
    // console.log(data)

  // console.log(JSON.stringify(taskStore.tasksFromDesk))
  // if (data.feedbacks.data != undefined){
  //   console.log(data['feedbacks'].data)
  // }
    function ar(data){
      if (data != undefined & data != null){
        // console.log(data)

        if (data.data != undefined) {
          return true
        }
         // console.log(data)
      }
    }

  return (
    
    <div>
      <CreatingTask />
    {/* {Array(taskStore.tasksFromDesk.length).fill(true).map((_, i) => <CardTask key={i} {...taskStore.tasksFromDesk[i]}/>)}  */}
    {ar(data.feedbacks.data) ? Array(data.feedbacks.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data.feedbacks.data['data'][i]}/>) : ''} 

    {/* {ar(data.feedbacks.data) ? console.log(data.feedbacks.data['data']): undefined} */}
      {/* {store.tasksFromDesk} */}
      {/* {console.log( sessionStorage.getItem('token') )} */}
    </div>
  )
});

export default DesksId
