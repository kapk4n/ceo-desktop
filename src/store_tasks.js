import {observable, action, makeObservable, autorun, computed} from 'mobx'

class TaskStore {
  tasksFromDesk = []
  deskId = 1

   task_3 = fetch(`http://localhost:8001/api/tasks/all/${this.deskId}`, {
    method: "GET",
    headers: {
      "origin": "http://localhost:8001/",
      "access-control-allow-origin":"http://localhost:8001/",
      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk1OTUzNTcsImlhdCI6MTY5OTU1MjE1NywidXNlcl9pZCI6MX0.ejzy51eBZ-VYoxPYroANUfi53M4GzZhwgeF1rS6vfNA",
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

  }

  showTasks = (deskId) => this.setDeskId(deskId);
}

export const taskStore = new TaskStore();
