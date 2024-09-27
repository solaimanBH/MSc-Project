import React from 'react';
import { Container, Row, Col, UncontrolledCarousel } from 'reactstrap';

const TestimonialsSection = () => {
  const items = [
    {
      src: '/hero-back.jpg', // You can add an image URL if needed, or leave it blank
      altText: 'Testimonial 1',
      caption: '"The work Jaago Foundation is doing is incredible. I feel honored to be a part of their mission."',
      header: '- Donor Name 1'
    },
    {
      src: '/hero-back.jpg',
      altText: 'Testimonial 2',
      caption: '"Supporting Jaago Foundation has been one of the most fulfilling experiences of my life."',
      header: '- Donor Name 2'
    },
    {
      src: '/hero-back.jpg',
      altText: 'Testimonial 3',
      caption: '"I am amazed by the positive impact Jaago Foundation has on so many lives."',
      header: '- Donor Name 3'
    }
  ];

  return (
    <div className="py-5">
      <h2 className="text-center mb-4">What Our Donors Say</h2>
      <Row className="justify-content-center">
        <Col md="8">
          <UncontrolledCarousel items={items} />
        </Col>
      </Row>
    </div>
  );
};

export default TestimonialsSection;