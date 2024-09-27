import React from 'react';
import { Container, Button } from 'reactstrap';

const AboutUsHero = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/hero-back.jpg)', // Replace with your image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '100px 0',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent overlay
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: '-1',
        }}
      />
      <Container>
        <h1 className="display-4">About Us</h1>
        <p className="lead">Learn more about our mission, vision, and the team behind our work.</p>
        <Button color="primary" size="lg">
          Get Involved
        </Button>
      </Container>
    </div>
  );
};

export default AboutUsHero;
