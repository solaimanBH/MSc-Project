import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';

const ProjectsSection = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Featured Projects</h2>
      <Row>
        {[1, 2, 3].map((project) => (
          <Col md="4" key={project}>
            <Card>
              <img
                src={'/hero-back.jpg'}
                alt={`Project ${project}`}
                className="card-img-top"
              />
              <CardBody>
                <CardTitle tag="h5">Project {project} Title</CardTitle>
                <CardText>
                  Brief description of Project {project}. This area will highlight the key objectives and impact of the project.
                </CardText>
                <Button color="primary">Learn More</Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsSection