import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

export default function FixedNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Quizzy</Navbar.Brand>
        <Nav>
          <Nav.Link href="#home">Reports</Nav.Link>
          {/* <Nav.Link href="#features">Features</Nav.Link> */}
          <Nav.Link href="#pricing">UserPersona</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
