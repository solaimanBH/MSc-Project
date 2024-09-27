import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import BasicLayout from '../components/layout/BasicLayout';

const ContactUsPage = () => {
  return (
    <BasicLayout>
      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          {/* Header Section */}
          <Row className="mb-5 text-center">
            <Col md="12">
              <h1 className="display-4">Contact Us</h1>
              <p className="lead mt-3">
                We’d love to hear from you! Whether you have questions, feedback, or want to get involved, feel free to reach out.
              </p>
            </Col>
          </Row>

          {/* Contact Information Section */}
          <Row className="mb-5">
            <Col md="4" className="mb-4">
              <Card className="shadow border-0 text-center">
                <CardBody>
                  <FaPhone size={40} className="text-primary mb-3" />
                  <CardTitle tag="h4">Phone</CardTitle>
                  <CardText>
                    +1 (123) 456-7890
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col md="4" className="mb-4">
              <Card className="shadow border-0 text-center">
                <CardBody>
                  <FaEnvelope size={40} className="text-primary mb-3" />
                  <CardTitle tag="h4">Email</CardTitle>
                  <CardText>
                    contact@jaagofoundation.org
                  </CardText>
                </CardBody>
              </Card>
            </Col>

            <Col md="4" className="mb-4">
              <Card className="shadow border-0 text-center">
                <CardBody>
                  <FaMapMarkerAlt size={40} className="text-primary mb-3" />
                  <CardTitle tag="h4">Address</CardTitle>
                  <CardText>
                    123 Charity St., Cityville, Country
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Social Media Links */}
          <Row className="text-center mb-5">
            <Col md="12">
              <h2 className="mb-4">Follow Us</h2>
              <p className="lead">
                Stay connected with Jaago Foundation through our social media channels.
              </p>
              <div>
                <Button color="primary" className="mr-2" href="https://facebook.com" target="_blank">
                  <FaFacebook className="mr-1" /> Facebook
                </Button>
                <Button color="info" className="mr-2" href="https://twitter.com" target="_blank">
                  <FaTwitter className="mr-1" /> Twitter
                </Button>
                <Button color="danger" className="mr-2" href="https://instagram.com" target="_blank">
                  <FaInstagram className="mr-1" /> Instagram
                </Button>
              </div>
            </Col>
          </Row>

          {/* Call to Action */}
          <Row className="text-center">
            <Col md="12">
              <h2 className="mb-4">Get In Touch</h2>
              <p className="lead">
                Have a question or just want to say hello? Feel free to get in touch with us today!
              </p>
              <Button color="primary" size="lg" href="mailto:contact@jaagofoundation.org">
                Email Us
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </BasicLayout>
  );
};

export default ContactUsPage;
