import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <div className="bg-warning text-white py-5">
      <Container>
        <Row className="align-items-center">
          <Col md="8">
            <h2>Ready to Make a Difference?</h2>
            <p className="lead">
              Join us in our mission to empower communities and change lives. Your support can help us reach more people in need.
            </p>
          </Col>
          <Col md="4" className="text-md-right">
            <Button color="dark" size="lg">
              <Link to="/donate-now">Donate Now</Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CallToAction;
