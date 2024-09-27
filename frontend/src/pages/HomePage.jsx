import BasicLayout from '$src/components/layout/BasicLayout';
import { API_BASE } from '$src/constants/base';
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaDonate, FaHandsHelping, FaProjectDiagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row, Spinner } from 'reactstrap';

const LandingPage = () => {
  const [data, setData] = useState({ projects: [], totalDonations: 0, volunteerCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await fetch(`${API_BASE}/homepage-data`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch homepage data');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load homepage data');
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  const heroImage = data.projects.length > 0 && data.projects[0].coverImage ? data.projects[0].coverImage.imagePath : 'path_to_default_image.jpg';

  return (
    <BasicLayout>
      {/* Hero Section */}
      <section
        className="text-center text-white d-flex justify-content-center align-items-center position-relative"
        style={{
          height: '70vh',
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div
          className="position-absolute w-100 h-100"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', top: 0, left: 0 }}
        ></div>

        {/* Hero Content */}
        <Container className="position-relative">
          <h1 className="display-4">Empower Communities, Change Lives</h1>
          <p className="lead">Join us in making a difference through donations and volunteer work.</p>
          <Link to="/donate-now" className="btn btn-primary btn-lg mt-3">
            Donate Now <FaHandsHelping className="ml-2" />
          </Link>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="text-center p-5 bg-secondary text-white">
        <Container>
          {loading ? (
            <Spinner color="white" />
          ) : (
            <Row>
              <Col md="4">
                <FaProjectDiagram size={50} className="mb-3" />
                <h3>{data.projects.length}</h3>
                <p>Projects</p>
              </Col>
              <Col md="4">
                <FaDonate size={50} className="mb-3" />
                <h3>${data.totalDonations.toLocaleString()}</h3>
                <p>Total Donations</p>
              </Col>
              <Col md="4">
                <FaHandsHelping size={50} className="mb-3" />
                <h3>{data.volunteerCount}</h3>
                <p>Volunteers</p>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      {/* Featured Projects Section */}
      <section className="p-5">
        <Container>
          <h2 className="text-center mb-4">Featured Projects</h2>
          {loading ? (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          ) : (
            <Row>
              {data.projects.slice(0, 3).map((project) => (
                <Col md="4" key={project._id} className="mb-4">
                  <Card className="shadow-sm h-100">
                    {project.coverImage && (
                      <CardImg
                        top
                        src={project.coverImage.imagePath}
                        alt={`Cover for ${project.title}`}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <CardBody className="d-flex flex-column">
                      <CardTitle tag="h5">{project.title}</CardTitle>
                      <CardText className="flex-grow-1">
                        {project.description.length > 60
                          ? `${project.description.substring(0, 60)}...`
                          : project.description}
                      </CardText>
                      <Link to={`/dashboard/projects/${project._id}`} className="btn btn-primary mt-auto">
                        View Project <FaArrowRight className="ml-2" />
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {error && <p className="text-danger text-center">{error}</p>}
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="text-center p-5 bg-dark text-white">
        <Container>
          <h2>Ready to Make a Difference?</h2>
          <p className="lead">
            Join our team of donors and volunteers to bring positive changes to communities worldwide.
          </p>
          <Link to="/volunteer/signup" className="btn btn-success btn-lg">
            Become a Volunteer <FaArrowRight className="ml-2" />
          </Link>
        </Container>
      </section>
    </BasicLayout>
  );
};

export default LandingPage;
