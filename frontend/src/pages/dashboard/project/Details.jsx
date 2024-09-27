import React, { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { FaPlusCircle, FaProjectDiagram } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card, CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Form, FormGroup,
  Input,
  Label,
  Modal,
  ModalBody, ModalFooter,
  ModalHeader,
  Progress,
  Row,
  Spinner,
  Table
} from 'reactstrap';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../../../constants/base';

const ProjectDetailsPage = () => {
  const { id } = useParams(); // Project ID from the URL
  const [project, setProject] = useState(null); // Holds the project details
  const [, setDonations] = useState([]); // Holds the donations for the project
  const [volunteers, setVolunteers] = useState([]); // Holds the list of volunteers
  const [tasks, setTasks] = useState([]); // Holds the tasks for the project
  const [loading, setLoading] = useState(true); // Loading state for data fetching
  const [error, setError] = useState(''); // Holds any error messages
  const [taskDescription, setTaskDescription] = useState(''); // Task description input value
  const [selectedVolunteer, setSelectedVolunteer] = useState(''); // Selected volunteer for task creation
  const [estimatedHours, setEstimatedHours] = useState(0);
  const [searchQuery, setSearchQuery] = useState(''); // Search query for tasks
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for task creation

  const authHeader = useAuthHeader(); // Authentication header from `react-auth-kit`
  const auth = useAuthUser(); // Get the authenticated user
  const isAdmin = auth.role === 'admin'; // Dynamically check if the user is an admin

  // Fetch the project details, donations, tasks, and volunteers
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_BASE}/projects/${id}`, {
          headers: {
            Authorization: authHeader, // Authorization header
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch project data');
        }

        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError('Error fetching project data');
      }
    };

    const fetchDonations = async () => {
      try {
        const response = await fetch(`${API_BASE}/donations?projectId=${id}`, {
          headers: {
            Authorization: authHeader,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch donation data');
        }

        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError('Error fetching donation data');
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE}/projects/${id}/tasks`, {
          headers: {
            Authorization: authHeader,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError('Error fetching tasks');
      } finally {
        setLoading(false); // Stop loading after all data is fetched
      }
    };

    const fetchVolunteers = async () => {
      try {
        const response = await fetch(`${API_BASE}/volunteers`, {
          headers: {
            Authorization: authHeader,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch volunteers');
        }

        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        setError('Error fetching volunteers');
      }
    };

    // Trigger all data fetching functions
    fetchProject();
    fetchDonations();
    fetchTasks();
    fetchVolunteers();
  }, [authHeader, id]);

  // Task creation handler
  const handleTaskCreation = async () => {
    try {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          project: id,
          volunteer: selectedVolunteer,
          description: taskDescription,
          estimatedHours,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      alert('Task created successfully');
      setTaskDescription(''); // Clear the input fields
      setSelectedVolunteer('');
      setIsModalOpen(false); // Close the modal after task creation
    } catch (err) {
      alert('Error creating task: ' + err.message);
    }
  };

  // Task reassignment handler
  const handleTaskReassignment = async (taskId, newVolunteerId) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({
          volunteer: newVolunteerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reassign task');
      }

      alert('Task reassigned successfully');
      // fetchTasks(); // Refresh the task list after reassignment
    } catch (err) {
      alert('Error reassigning task: ' + err.message);
    }
  };
  const handleStatusChange = async (taskId, status) => {
    try {
      const response = await fetch(`${API_BASE}/tasks/changeStatus/${taskId}/${status}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to reassign task');
      }

      alert('Task reassigned successfully');
      fetchTasks(); // Refresh the task list after reassignment
    } catch (err) {
      alert('Error reassigning task: ' + err.message);
    }
  };

  // Navigation to edit project

  // Project deletion handler

  // Toggle the task creation modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate project completion percentage
  const completionPercentage = (project?.currentAmount / project?.goalAmount) * 100;

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <Container className="text-center">
          <Spinner color="primary" />
        </Container>
      </DashboardLayout>
    );
  }

  // Error handling
  if (error) {
    return (
      <DashboardLayout>
        <Container>
          <Alert color="danger">{error}</Alert>
        </Container>
      </DashboardLayout>
    );
  }

  // If project data is not available
  if (!project) {
    return (
      <DashboardLayout>
        <Container>
          <Alert color="danger">Project not found</Alert>
        </Container>
      </DashboardLayout>
    );
  }

  // Extract project details
  const { title, description, coverImage } = project;

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col md="12">
            <Card className="shadow-sm">
              <CardBody>
                {/* Cover Image */}
                {coverImage && (
                  <img
                    src={coverImage.imagePath}
                    alt={title}
                    className="img-fluid mb-4"
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                  />
                )}

                <CardTitle tag="h2" className="mb-4">
                  <FaProjectDiagram className="mr-2" /> {title}
                </CardTitle>
                <CardText className="mb-4">
                  {description}
                </CardText>

                {/* Progress Bar for project completion */}
                <CardText>
                  <strong>Project Completion:</strong>
                </CardText>
                <Progress value={completionPercentage} color={completionPercentage >= 100 ? 'success' : 'primary'}>
                  {completionPercentage.toFixed(2)}%
                </Progress>

                {/* Task List */}
                <CardText className="mb-4 mt-4">
                  <strong>Tasks:</strong>
                  <Input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-3"
                  />
                  {filteredTasks.length > 0 ? (
                    <Table striped responsive>
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Volunteer</th>
                          <th>Estimated Hours</th>
                          <th>Status</th>
                          {isAdmin && (
                            <>
                              <th>Reassign Volunteer</th>
                              <th>Change Status</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTasks.map((task) => (
                          <tr key={task._id}>
                            <td>{task.description}</td>
                            <td>{task.volunteer.name} ({task.volunteer.email})</td>
                            <td>{task.estimatedHours}</td>
                            <td>
                              <Badge color={
                                task.status === 'pending' ? 'warning' :
                                  task.status === 'in-progress' ? 'primary' :
                                    'success'}>
                                {task.status}
                              </Badge>
                            </td>
                            {isAdmin && (
                              <>
                                <td>
                                  <Input
                                    type="select"
                                    value={task.volunteer._id}
                                    onChange={(e) => handleTaskReassignment(task._id, e.target.value)}
                                  >
                                    {volunteers.map((volunteer) => (
                                      <option key={volunteer._id} value={volunteer._id}>
                                        {volunteer.name} - {volunteer.email}
                                      </option>
                                    ))}
                                  </Input>
                                </td>
                                <td>
                                  <Input
                                    type="select"
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                    readOnly={task.status === 'completed'}
                                  >
                                    {['pending', 'in-progress', 'completed'].map((status) => (
                                      <option key={status} value={status}>
                                        {status}
                                      </option>
                                    ))}
                                  </Input>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <p>No tasks available.</p>
                  )}
                </CardText>

                {/* Create Task Button */}
                {isAdmin && (
                  <Button color="primary" onClick={toggleModal}>
                    <FaPlusCircle className="mr-2" /> Create New Task
                  </Button>
                )}

                {/* Modal for Task Creation */}
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                  <ModalHeader toggle={toggleModal}>Create New Task</ModalHeader>
                  <ModalBody>
                    <Form>
                      <FormGroup>
                        <Label for="taskDescription">Task Description</Label>
                        <Input
                          type="text"
                          id="taskDescription"
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="volunteerSelect">Assign to Volunteer</Label>
                        <Input
                          type="select"
                          id="volunteerSelect"
                          value={selectedVolunteer}
                          onChange={(e) => setSelectedVolunteer(e.target.value)}
                        >
                          <option value="">Select Volunteer</option>
                          {volunteers.map((volunteer) => (
                            <option key={volunteer._id} value={volunteer._id}>
                              {volunteer.name} - {volunteer.email}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="estimatedHours">Estimated Hours</Label>
                        <Input
                          type="number"
                          id="estimatedHours"
                          value={estimatedHours}
                          onChange={(e) => setEstimatedHours(e.target.value)}
                          min="0"
                        />
                      </FormGroup>
                    </Form>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="primary" onClick={handleTaskCreation}>
                      Create Task
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>

                {/* Donations, Volunteers, etc. would go here */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default ProjectDetailsPage;
