import { API_BASE } from '$src/constants/base';
import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Alert, Card, CardBody, CardText, CardTitle, Col, Container, Row, Spinner } from 'reactstrap';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';

const VolunteerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [totalHoursWorked, setTotalHoursWorked] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchVolunteerData = async () => {
      try {
        // Fetch both projects and tasks in one request
        const response = await fetch(`${API_BASE}/dashboard`, {
          method: 'GET',
          headers: {
            Authorization: authHeader,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch volunteer data');
        }

        const data = await response.json();
        setProjects(data.projects);
        setTasks(data.tasks);
        setTotalHoursWorked(data.totalHoursWorked);
        setCompletedTasksCount(data.completedTasksCount);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchVolunteerData();
  }, [authHeader]);

  return (
    <DashboardLayout>
      <Container className="py-5">
        <h2 className="mb-4 text-center">Volunteer Dashboard</h2>

        {loading ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : error ? (
          <Alert color="danger">{error}</Alert>
        ) : (
          <>
            {/* Summary Section */}
            <Row className="mb-4">
              <Col md="6" className="text-center">
                <Card className="shadow-sm">
                  <CardBody>
                    <CardTitle tag="h5">Total Hours Worked</CardTitle>
                    <CardText className="h4">{totalHoursWorked} hours</CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" className="text-center">
                <Card className="shadow-sm">
                  <CardBody>
                    <CardTitle tag="h5">Tasks Completed</CardTitle>
                    <CardText className="h4">{completedTasksCount} tasks</CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* Projects Section */}
            <Row className="mb-4">
              <Col md="12">
                <h3>My Projects</h3>
                {projects.length > 0 ? (
                  <Row>
                    {projects.map((project) => (
                      <Col md="6" key={project._id} className="mb-4">
                        <Card className="shadow-sm h-100">
                          <CardBody>
                            <CardTitle tag="h5">{project.title}</CardTitle>
                            <CardText>{project.description.substring(0, 60)}...</CardText>
                            <CardText className="font-weight-bold">
                              Status: {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>You are not assigned to any projects yet.</p>
                )}
              </Col>
            </Row>

            {/* Tasks Section */}
            <Row>
              <Col md="12">
                <h3>My Tasks</h3>
                {tasks.length > 0 ? (
                  <Row>
                    {tasks.map((task) => (
                      <Col md="6" key={task._id} className="mb-4">
                        <Card className="shadow-sm h-100">
                          <CardBody>
                            <CardTitle tag="h5">Task: {task.description}</CardTitle>
                            <CardText>
                              <strong>Project:</strong> {task.project.title}
                              <br />
                              <strong>Status:</strong> {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                              <br />
                              <strong>Estimated Hours:</strong> {task.estimatedHours}
                            </CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No tasks assigned yet.</p>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default VolunteerDashboard;
