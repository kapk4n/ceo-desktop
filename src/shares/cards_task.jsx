import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function CardTask(title) {
  return (
    <Card>
      {/* <Card.Header as="h5">{title['title']}</Card.Header> */}
      <Card.Body>
        <Card.Title>{title['title']}</Card.Title>
        {/* {console.log(title['title'])} */}
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary" href={`/`}>Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default CardTask;