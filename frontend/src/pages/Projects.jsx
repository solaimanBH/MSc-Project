import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, CardImg, Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { API_BASE } from '../constants/base';
import BasicLayout from '../components/layout/BasicLayout';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_BASE + '/projects', {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError('Failed to fetch projects.');
      }
    };

    fetchProjects();
  }, []);

  // Function to limit description length
  const limitDescription = (description) => {
    return description.length > 120 ? description.substring(0, 120) + '...' : description;
  };

  return (
    <BasicLayout>
      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          {/* Header Section */}
          <Row className="mb-5 text-center">
            <Col md="12">
              <h1 className="display-4">Our Projects</h1>
              <p className="lead">
                Explore our ongoing and completed projects. Join us in making a difference.
              </p>
            </Col>
          </Row>

          {/* Error Alert */}
          {error && <Alert color="danger">{error}</Alert>}

          {/* Projects List */}
          <Row>
            {projects.length > 0 ? (
              projects.map((project) => (
                <Col md="4" sm="6" key={project._id} className="mb-4">
                  <Card className="border-light shadow-sm">
                    {/* Cover Image (if available) */}
                    {project.coverImage && project.coverImage.imagePath && (
                      <CardImg
                        top
                        src={project.coverImage.imagePath}
                        alt={`Cover for ${project.title}`}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <CardBody>
                      <CardTitle tag="h5">{project.title}</CardTitle>
                      <CardText>{limitDescription(project.description)}</CardText>
                      <CardText className="font-weight-bold">
                        Goal: &pound;{project.goalAmount.toLocaleString()} | Current: &pound;{project.currentAmount.toLocaleString()}
                      </CardText>
                      <div className="d-flex justify-content-between">
                        <Link to={`/projects/${project._id}`} className="btn btn-primary">
                          Learn More
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))
            ) : (
              <Col md="12">
                <Card body className="text-center">
                  <CardTitle tag="h5">No Projects Available</CardTitle>
                  <CardText>Come back later to see the projects we are working on.</CardText>
                </Card>
              </Col>
            )}
          </Row>

          {/* Call to Action */}
          <Row className="text-center mt-5">
            <Col md="12">
              <h2 className="mb-4">Want to Get Involved?</h2>
              <p className="lead">
                Join us in making a lasting impact on the community. Become a volunteer or make a donation today!
              </p>
              <Button color="success" className="mr-2">
                <Link href="/volunteer/signup">
                  Become a Volunteer
                </Link>
              </Button>
              <Button color="primary">
                <Link href="/donate-now">
                  Donate Now
                </Link>
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
    </BasicLayout>
  );
};

export default ProjectsPage;
