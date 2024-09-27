import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const FooterSection = () => {
  return (
    <footer className="py-4">
      <Container>
        <Row>
          <Col md="4">
            <h5>Quick Links</h5>
            <Nav vertical>
              <NavItem>
                <NavLink href="#">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Projects</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Blog</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="4">
            <h5>Contact Us</h5>
            <p>Email: contact@jaagofoundation.org</p>
            <p>Phone: +123 456 789</p>
          </Col>
          <Col md="4">
            <h5>Follow Us</h5>
            <Nav>
              <NavItem>
                <NavLink href="#"><i className="fa fa-facebook" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"><i className="fa fa-twitter" /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#"><i className="fa fa-instagram" /></NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterSection