import { Container, Row, Col } from 'reactstrap'

const ImpactMetricsSection = () => {
  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="text-center">
          <Col md="4">
            <h3>10,000+</h3>
            <p>Children Educated</p>
          </Col>
          <Col md="4">
            <h3>50,000+</h3>
            <p>Meals Provided</p>
          </Col>
          <Col md="4">
            <h3>100+</h3>
            <p>Communities Served</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ImpactMetricsSection