import React, { useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useParams } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Progress, Row, Spinner } from 'reactstrap';
import BasicLayout from '../components/layout/BasicLayout';
import DashboardLayout from '../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../constants/base';

const ProjectDetailsPageGuest = () => {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const user = useAuthUser()

  useEffect(() => {
    // Fetch project details by ID
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_BASE}/projects/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError('Failed to load project details.');
      }
    };

    fetchProject();
  }, [id]);

  // Render only if project details are available
  if (!project && !error) {
    return (
      <Container fluid className="py-5 text-center">
        <Spinner color="primary" />
      </Container>
    );
  }

  if (user) {
    return <DashboardLayout>
      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          {/* Error Alert */}
          {error && <Alert color="danger">{error}</Alert>}

          {project && (
            <>
              {/* Project Title and Description */}
              <Row className="mb-5">
                <Col md="12" className="text-center">
                  <h1 className="display-4">{project.title}</h1>
                  <p className="lead mt-3">{project.description}</p>
                </Col>
              </Row>

              {/* Cover Image */}
              {project.coverImage && project.coverImage.imagePath && (
                <Row className="mb-5">
                  <Col md="12">
                    <img
                      top
                      src={project.coverImage.imagePath}
                      alt={`Cover for ${project.title}`}
                      height={400}
                      className="img-fluid"
                    />
                  </Col>
                </Row>
              )}

              {/* Funding Progress */}
              <Row className="mb-5">
                <Col md="6" className="mb-4">
                  <Card className="shadow border-0">
                    <CardBody>
                      <CardTitle tag="h3">Funding Progress</CardTitle>
                      <CardText>
                        Goal: &pound;{project.goalAmount.toLocaleString()} | Raised: &pound;{project.currentAmount.toLocaleString()}
                      </CardText>
                      <Progress value={(project.currentAmount / project.goalAmount) * 100}>
                        {((project.currentAmount / project.goalAmount) * 100).toFixed(2)}%
                      </Progress>
                    </CardBody>
                  </Card>
                </Col>

                {/* Call to Action */}
                <Col md="6" className="mb-4 text-center">
                  <h3 className="mb-4">Get Involved</h3>
                  <p>Join us in making a difference by donating or becoming a volunteer for this project.</p>
                  <Button color="primary" size="lg" href="/donate">
                    Donate Now
                  </Button>
                  <Button color="success" size="lg" href="/volunteer" className="ml-3">
                    Become a Volunteer
                  </Button>
                </Col>
              </Row>

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <Row className="mb-5">
                  <Col md="12">
                    <h3 className="mb-4 text-center">Project Gallery</h3>
                    <Row>
                      {project.gallery.map((image) => (
                        <Col md="4" sm="6" key={image._id} className="mb-4">
                          <Card>
                            <CardImg
                              top
                              src={image.imagePath}
                              alt={`Gallery Image for ${project.title}`}
                              style={{ height: '250px', objectFit: 'cover' }}
                            />
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Container>
      </Container>
    </DashboardLayout>
  }

  return (
    <BasicLayout>
      <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <Container>
          {/* Error Alert */}
          {error && <Alert color="danger">{error}</Alert>}

          {project && (
            <>
              {/* Project Title and Description */}
              <Row className="mb-5">
                <Col md="12" className="text-center">
                  <h1 className="display-4">{project.title}</h1>
                  <p className="lead mt-3">{project.description}</p>
                </Col>
              </Row>

              {/* Cover Image */}
              {project.coverImage && project.coverImage.imagePath && (
                <Row className="mb-5">
                  <Col md="12">
                    <CardImg
                      top
                      src={project.coverImage.imagePath}
                      alt={`Cover for ${project.title}`}
                      className="img-fluid"
                    />
                  </Col>
                </Row>
              )}

              {/* Funding Progress */}
              <Row className="mb-5">
                <Col md="6" className="mb-4">
                  <Card className="shadow border-0">
                    <CardBody>
                      <CardTitle tag="h3">Funding Progress</CardTitle>
                      <CardText>
                        Goal: &pound;{project.goalAmount.toLocaleString()} | Raised: &pound;{project.currentAmount.toLocaleString()}
                      </CardText>
                      <Progress value={(project.currentAmount / project.goalAmount) * 100}>
                        {((project.currentAmount / project.goalAmount) * 100).toFixed(2)}%
                      </Progress>
                    </CardBody>
                  </Card>
                </Col>

                {/* Call to Action */}
                <Col md="6" className="mb-4 text-center">
                  <h3 className="mb-4">Get Involved</h3>
                  <p>Join us in making a difference by donating or becoming a volunteer for this project.</p>
                  <Button color="primary" size="lg" href="/donate">
                    Donate Now
                  </Button>
                  <Button color="success" size="lg" href="/volunteer" className="ml-3">
                    Become a Volunteer
                  </Button>
                </Col>
              </Row>

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <Row className="mb-5">
                  <Col md="12">
                    <h3 className="mb-4 text-center">Project Gallery</h3>
                    <Row>
                      {project.gallery.map((image) => (
                        <Col md="4" sm="6" key={image._id} className="mb-4">
                          <Card>
                            <CardImg
                              top
                              src={image.imagePath}
                              alt={`Gallery Image for ${project.title}`}
                              style={{ height: '250px', objectFit: 'cover' }}
                            />
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>
              )}
            </>
          )}
        </Container>
      </Container>
    </BasicLayout>
  );
};

export default ProjectDetailsPageGuest;
