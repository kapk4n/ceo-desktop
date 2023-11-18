import {observable, action, makeObservable, autorun, computed} from 'mobx'
import { store } from './store';


class TaskStore {
  tasksFromDesk = []
  deskId = 1

   task_3 = fetch(`http://localhost:8001/api/tasks/all/${this.deskId}`, {
    method: "GET",
    headers: {
      "origin": "http://localhost:8001/",
      "access-control-allow-origin":"http://localhost:8001/",
      "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
    },
  })
  .then(res => res.json())
  .then(data => {
    this.ext_task = data;
  })
  .then(() => {
    this.tasksFromDesk.push(...JSON.parse(JSON.stringify(this.ext_task)).data)
   });


  constructor () {
    makeObservable(this, {
      tasksFromDesk:observable,
      setDeskId:action,
      showTasks:action,
    })
  }


  setDeskId (deskId) {
    this.tasksFromDesk = this.tasksFromDesk
    // console.log(store.token)
  }

  showTasks = (deskId) => this.setDeskId(deskId);
}

export const taskStore = new TaskStore();
