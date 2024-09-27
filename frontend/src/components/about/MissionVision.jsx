import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const MissionVision = () => {
  return (
    <Container className="py-5">
      <Row className="mb-5 align-items-center">
        <Col md="6">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower underprivileged communities through education, healthcare, and sustainable development. We strive to make a tangible difference in the lives of those in need by providing essential resources and support.
          </p>
        </Col>
        <Col md="6">
          <img
            src="/hero-back.jpg"
            alt="Our Mission"
            className="img-fluid rounded"
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md="6" order={{ md: 2 }}>
          <h2>Our Vision</h2>
          <p>
            We envision a world where every child has access to quality education, healthcare, and the opportunity to achieve their full potential. Through our programs and initiatives, we aim to create a brighter future for the next generation.
          </p>
        </Col>
        <Col md="6" order={{ md: 1 }}>
          <img
            src="/hero-back.jpg"
            alt="Our Vision"
            className="img-fluid rounded"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MissionVision;
