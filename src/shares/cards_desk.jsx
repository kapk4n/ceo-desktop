import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from 'axios';


function WithHeaderStyledExample(title) {

  const deleteDesk = async (e) => {
  
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.delete(`http://localhost:8001/api/lists/delete/${title['desk_id']}`);
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
        {title['description']}
        </Card.Text>
        <Button variant="primary" href={`/desks/${title['desk_id']}`}>Go somewhere</Button>
        <form onSubmit={deleteDesk}><Button variant="danger" type="submit"> <BsFillTrash3Fill /> </Button></form>
      </Card.Body>
    </Card>
  );
}

export default WithHeaderStyledExample;