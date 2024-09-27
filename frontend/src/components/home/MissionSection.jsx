import { Button, Container, Row, Col } from 'reactstrap'

const MissionSection = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        <Col md="6">
          <img
            src="/hero-back.jpg"
            alt="Mission"
            className="img-fluid"
          />
        </Col>
        <Col md="6">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide education, food, health, and habitat to those in need across the globe. We believe every child deserves a chance to grow and thrive in a supportive environment.
          </p>
          <Button color="primary">Learn More</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MissionSection