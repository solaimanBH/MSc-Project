import { Button, Container, Row, Col } from 'reactstrap'


const HeroSection = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/hero-back.jpg)', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '150px 0',
        position: 'relative',
        textAlign: 'center',
        zIndex: '1',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: '-1',
        }}
      />
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <h1 className="display-4">Empower Lives Through Education & Health</h1>
            <p className="lead">Join us in making a difference today.</p>
            <Button color="primary" size="lg">
              Donate Now
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection