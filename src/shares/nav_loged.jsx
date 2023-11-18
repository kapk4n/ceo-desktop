import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Profile from '../pages/profile';
import LoginForm from './login_form';
import Button from 'react-bootstrap/Button';

function LogedNav() {
  const logout = async (e) => {
    e.preventDefault();
    sessionStorage.clear()
    window.location.reload()
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/desks">desks</Nav.Link>
          </Nav>
          <Nav>
            <Button href='/profile'>Profile</Button>
            <Button onClick={logout}>Logout</Button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LogedNav;