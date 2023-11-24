// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import LogedNav from './shares/nav_loged.jsx'
import NotLogedNav from './shares/nav_not_loged.jsx'


import { BrowserRouter as Router, Routes, Route }
from 'react-router-dom';
import ToDoList, { TodoList } from './pages/todo'

import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import DesksList from './pages/desks_list';
import DesksId from './pages/desk_id';
import LoginForm from './shares/login_form';
import Profile from './pages/profile';
import SignForm from './shares/registration_form';



// export const setAuthToken = token => {
//   if (token) {
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   }
//   else
//       delete axios.defaults.headers.common["Authorization"];
// }
const loged = () => {
  
  if (sessionStorage.getItem('token') != undefined) {
    return true
  }else{
    return false
  }
}

const App = observer(() => {

  return (
    
    <div>
      {loged() ? <LogedNav/> : <NotLogedNav />}
     {
// sessionStorage.clear()

     }
    {/* <WithHeaderStyledExample/> */}
      {/* <TodoList/> */}
      <Router>
            <Routes>
                <Route path='/' exect element={<ToDoList />} />
                {/* <Route path='/sign_in' element={<LoginForm />} />
                <Route path='/sign_up' element={<SignForm />} /> */}
                <Route path='/profile' element={<Profile />} />
                <Route path='/desks' element={<DesksList />} />
                <Route path="/desks/:id" element={<DesksId />} />
            </Routes>
        </Router>
    </div>
  )
});

export default App
