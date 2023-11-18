import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OffCanvasExample from '../pages/task_page';
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from 'axios';
import {useParams} from "react-router-dom";


function CardTask(title) {
  let { id } = useParams();
  console.log(id)
  const deleteTask = async (e) => {
  
    // console.log(title)
  
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.delete(`http://localhost:8001/api/tasks/delete/${title['task_id']}`);
      location.reload()
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };


  return (
    <Card>
      {/* <Card.Header as="h5">{title['title']}</Card.Header> */}
      <Card.Body>
        <Card.Title>{title['title']}</Card.Title>
        {/* {console.log(title['title'])} */}
        <Card.Text>
          {title['priority']}
        </Card.Text>
        {/* <Button variant="primary" href={`task/${title['task_id']}`}>Go somewhere</Button> */}
        <OffCanvasExample  task={title} placement={'end'}/>
        <form onSubmit={deleteTask}><Button variant="danger" type="submit"> <BsFillTrash3Fill /> </Button></form>
      </Card.Body>
      <Card.Footer>{title['description']}</Card.Footer>
    </Card>
  );
}

export default CardTask;