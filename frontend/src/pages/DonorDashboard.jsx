import { API_BASE } from '$src/constants/base';
import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FaDonate } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardText, CardTitle, Col, Container, Row, Spinner } from 'reactstrap';
import DashboardLayout from '../components/layout/Dashboard/Layoutv2';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${API_BASE}/donations`, {
          method: 'GET',
          headers: {
            Authorization: authHeader,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch donations!!');
        }

        const data = await response.json();
        setDonations(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load donations');
        setLoading(false);
      }
    };

    fetchDonations();
  }, [authHeader]);

  return (
    <DashboardLayout>
      <Container className="py-5">
        <h2 className="mb-4 text-center">Donor Dashboard</h2>

        {loading ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : error ? (
          <Alert color="danger">{error}</Alert>
        ) : (
          <>
            <Row>
              <Col md="12">
                <h3>My Donations</h3>
                {donations.length > 0 ? (
                  <Row>
                    {donations.map((donation) => (
                      <Col md="6" key={donation._id} className="mb-4">
                        <Card className="shadow-sm h-100">
                          <CardBody>
                            <CardTitle tag="h5">{donation.project.title}</CardTitle>
                            <CardText>
                              Amount Donated: ${donation.amount}
                              <br />
                              Status: {donation.paymentStatus}
                              <br />
                              Date: {new Date(donation.createdAt).toLocaleDateString()}
                            </CardText>
                            <Link to={`/projects/${donation.project._id}`} className="btn btn-primary">
                              View Project
                            </Link>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No donations yet. <Link to="/projects">Donate Now</Link></p>
                )}
              </Col>
            </Row>

            <Row className="mt-5">
              <Col md="12" className="text-center">
                <Button color="success" tag={Link} to="/projects">
                  <FaDonate className="mr-2" /> Donate to More Projects
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default DonorDashboard;
