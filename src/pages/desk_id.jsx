import '../App.css'
import CardTask from '../shares/cards_task.jsx'
import React from 'react';
import { taskStore } from '../store_tasks';

import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';



const DesksId = observer(() => {


  const queryString = window.location.href;
  const desk_id = queryString.slice(-1)
  taskStore.showTasks(desk_id)

// console.log(get(3))
  // console.log(JSON.stringify(taskStore.tasksFromDesk))

  return (
    
    <div>
      
    {Array(taskStore.tasksFromDesk.length).fill(true).map((_, i) => <CardTask key={i} {...taskStore.tasksFromDesk[i]}/>)} 
    {/* {Array(tasksFromDesk.length).fill(true).map((_, i) => <CardTask key={i} {...tasksFromDesk[i]}/>)}  */}

    {/* {console.log(tasksFromDesk)} */}
      {/* {store.tasksFromDesk} */}
      {/* {console.log( new URLSearchParams(queryString))} */}
    </div>
  )
});

export default DesksId
