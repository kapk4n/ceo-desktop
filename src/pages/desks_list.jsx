import '../App.css'
import WithHeaderStyledExample from '../shares/cards_desk.jsx'
import React from 'react';
import { store } from '../store';

import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatingDesk from './desk_creating'

const DesksList = observer(() => {
  const desks = store.desks


  return (
    
    <div>
      <CreatingDesk />
   {Array(desks.length).fill(true).map((_, i) => <WithHeaderStyledExample key={i} {...desks[i]}/>)} 
      {store.desks}
    </div>
  )
});

export default DesksList
