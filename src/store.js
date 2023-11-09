import {observable, action, makeObservable, autorun, computed} from 'mobx'

class TodoStore {
  tasks = []
  
  desks = []
  ext_desk = []




  desks_3 = fetch(`http://localhost:8001/api/lists/`, {
    method: "GET",
    headers: {
      "origin": "http://localhost:8001/",
      "access-control-allow-origin":"http://localhost:8001/",
      "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk1OTUzNTcsImlhdCI6MTY5OTU1MjE1NywidXNlcl9pZCI6MX0.ejzy51eBZ-VYoxPYroANUfi53M4GzZhwgeF1rS6vfNA",
    },
  })
  .then(res => res.json())
  .then(data => {
    this.ext_desk.push(data);
   })
  .then(() => {
    // console.log(...JSON.parse(JSON.stringify(this.ext_desk['0'])).data);

    this.desks.push(...JSON.parse(JSON.stringify(this.ext_desk['0'])).data)
   });


  constructor () {
    makeObservable(this, {
      tasks:observable,
      desks:observable,
      setTasks:action,
      setDesks:action,
      addTask:action,
      addDesk:action
    })
  }

  setTasks (tasks) {
    this.tasks = tasks
  }

  setDesks (desks) {
    this.desks = desks
    // console.log(typeof(desks)[0])
    // console.log(desks[0])
    // console.log(this.desks)
  }




  addTask = (taskName) => this.setTasks([...this.tasks, taskName]);
  addDesk = (deskName) => this.setDesks([...this.desks, deskName]);

}

export const store = new TodoStore();
