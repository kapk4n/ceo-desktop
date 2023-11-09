// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import CollapsibleExample from './shares/nav.jsx'

import { BrowserRouter as Router, Routes, Route }
from 'react-router-dom';
import ToDoList, { TodoList } from './pages/todo'

import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import DesksList from './pages/desks_list';
import DesksId from './pages/desk_id';


const App = observer(() => {

  return (
    
    <div>
    <CollapsibleExample/> 
    {/* <WithHeaderStyledExample/> */}
      {/* <TodoList/> */}
      <Router>
            <Routes>
                <Route path='/' exect element={<ToDoList />} />
                <Route path='/desks' element={<DesksList />} />
                <Route path='/desks/:id' element={<DesksId />} />

            </Routes>
        </Router>
    </div>
  )
});

export default App
