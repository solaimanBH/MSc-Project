import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import BasicLayout from '../components/layout/BasicLayout';

const PrivacyAndDataProtectionPage = () => {
  return (
    <BasicLayout>
      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          {/* Header Section */}
          <Row className="mb-5 text-center">
            <Col md="12">
              <h1 className="display-4">Privacy and Data Protection</h1>
              <p className="lead mt-3">
                Your privacy is important to us. Learn more about how we collect, use, and protect your personal information.
              </p>
            </Col>
          </Row>

          {/* Data Collection Section */}
          <Row className="mb-5">
            <Col md="12">
              <Card className="shadow border-0">
                <CardBody>
                  <CardTitle tag="h3">What Information We Collect</CardTitle>
                  <p>
                    We collect personal information that you provide to us when you register on our site, make a donation, or interact with
                    our services. This includes your name, email address, phone number, and payment details for donations.
                  </p>
                  <p>
                    Additionally, we collect non-personal information, such as browser type, device information, and your activity on the site,
                    to improve your experience and our services.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* How We Use the Information Section */}
          <Row className="mb-5">
            <Col md="12">
              <Card className="shadow border-0">
                <CardBody>
                  <CardTitle tag="h3">How We Use Your Information</CardTitle>
                  <p>
                    We use your personal information to manage your donations, respond to your inquiries, and provide updates on our projects.
                    Your data helps us personalize your experience and ensure that our services are relevant to you.
                  </p>
                  <p>
                    We will not sell or share your personal information with third parties, except when required by law or necessary for
                    completing a transaction (e.g., payment processing).
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Data Protection Measures Section */}
          <Row className="mb-5">
            <Col md="12">
              <Card className="shadow border-0">
                <CardBody>
                  <CardTitle tag="h3">How We Protect Your Information</CardTitle>
                  <p>
                    We take the security of your personal information seriously. We use industry-standard security measures, including encryption,
                    firewalls, and secure servers, to protect your data from unauthorized access, disclosure, or destruction.
                  </p>
                  <p>
                    However, no system can be completely secure. While we take every precaution, we cannot guarantee the absolute security of
                    your information.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* User Rights Section */}
          <Row className="mb-5">
            <Col md="12">
              <Card className="shadow border-0">
                <CardBody>
                  <CardTitle tag="h3">Your Rights Regarding Your Data</CardTitle>
                  <p>
                    You have the right to access, update, or delete your personal information at any time. If you wish to exercise any of these rights,
                    please contact us at privacy@jaagofoundation.org.
                  </p>
                  <p>
                    You may also opt out of receiving marketing communications from us at any time by following the unsubscribe instructions in our emails.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Contact Us Section */}
          <Row className="text-center">
            <Col md="12">
              <h2 className="mb-4">Have Questions?</h2>
              <p className="lead">
                If you have any questions or concerns about our privacy policy or data protection practices, feel free to reach out.
              </p>
              <p>
                Email us at <a href="mailto:privacy@jaagofoundation.org">privacy@jaagofoundation.org</a>.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </BasicLayout>
  );
};

export default PrivacyAndDataProtectionPage;
