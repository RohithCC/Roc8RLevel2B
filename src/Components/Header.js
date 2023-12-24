import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css';

function Header() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#343a40" }}>
      <Container>
        <Navbar.Brand href="/" id='text1'>BistroPal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/home" id='text'>Restorant List </Nav.Link>
            <Nav.Link href="/add_restorent" id='text'>Add Restorant</Nav.Link>
            <Nav.Link href="/Aboutus" id='text'>About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;