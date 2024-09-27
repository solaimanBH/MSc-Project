import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import BasicLayout from '$src/components/layout/BasicLayout'

const NotFoundPage = () => {
  return (
    <BasicLayout>
      <Container className="text-center" style={{ marginTop: '10%', color: '#333', minHeight: '48vh' }}>
        <Row>
          <Col>
            <h1 style={{ fontSize: '10rem', fontWeight: 'bold', color: 'yellow' }}>404</h1>
            <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
            <p>The page you're looking for doesn't exist or has been moved.</p>
            <Link to="/">
              <Button color="primary" style={{ backgroundColor: 'yellow', borderColor: 'yellow', color: '#333' }}>
                Go to Home
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </BasicLayout>
  );
};

export default NotFoundPage;
