import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

const TeamMembers = () => {
  const team = [
    { name: 'John Doe', role: 'Founder & CEO', image: '/basic-user.jpg' },
    { name: 'Jane Smith', role: 'COO', image: '/basic-user.jpg' },
    { name: 'Bob Johnson', role: 'CFO', image: '/basic-user.jpg' },
    // Add more team members here
  ];

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Meet Our Team</h2>
      <Row>
        {team.map((member, index) => (
          <Col md="4" key={index * 5} className="mb-4">
            <Card className="text-center border-0">
              <img src={member.image} alt={member.name} className="card-img-top rounded-circle" style={{ width: '150px', height: '150px', margin: 'auto' }} />
              <CardBody>
                <CardTitle tag="h5">{member.name}</CardTitle>
                <CardText>{member.role}</CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeamMembers;
