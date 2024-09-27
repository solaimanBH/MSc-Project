import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { API_BASE } from '$src/constants/base';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FaPlus, FaProjectDiagram, FaEdit } from 'react-icons/fa';
import DashboardLayout from '$src/components/layout/Dashboard/Layoutv2';

const VolunteerListPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null); // For project assignment modal
  const [assignProjectId, setAssignProjectId] = useState('');
  const [modal, setModal] = useState(false);
  const authHeader = useAuthHeader();

  const toggleModal = () => setModal(!modal);

  useEffect(() => {
    // Fetch volunteers and projects from API
    const fetchData = async () => {
      try {
        const volunteerResponse = await fetch(`${API_BASE}/volunteers`, {
          headers: { Authorization: authHeader },
        });
        const projectResponse = await fetch(`${API_BASE}/projects`, {
          headers: { Authorization: authHeader },
        });

        if (!volunteerResponse.ok || !projectResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const volunteerData = await volunteerResponse.json();
        const projectData = await projectResponse.json();

        setVolunteers(volunteerData);
        setProjects(projectData);
        setLoading(false);
      } catch (err) {
        setError('Error loading data');
        setLoading(false);
      }
    };

    fetchData();
  }, [authHeader]);

  const assignVolunteerToProject = async () => {
    if (!assignProjectId || !selectedVolunteer) return;

    try {
      const response = await fetch(`${API_BASE}/projects/volunteer/assign`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify({ projectId: assignProjectId, volunteerId: selectedVolunteer._id }),
      });

      if (!response.ok) {
        throw new Error('Failed to assign project');
      }

      // Refresh the volunteer list
      setVolunteers((prev) =>
        prev.map((vol) =>
          vol._id === selectedVolunteer._id ? { ...vol, projects: [...vol.projects, assignProjectId] } : vol
        )
      );

      setModal(false);
      setAssignProjectId('');
      setSelectedVolunteer(null);
    } catch (err) {
      setError('Error assigning volunteer to project');
    }
  };

  const handleProjectAssignClick = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setModal(true);
  };

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col md="12" className="d-flex justify-content-between align-items-center">
            <h2>Volunteers</h2>
            <Link className="btn btn-primary" to="/dashboard/volunteers/create">
              <FaPlus className="mr-2" /> Add Volunteer
            </Link>
          </Col>
        </Row>

        {error && <Alert color="danger">{error}</Alert>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Assigned Projects</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer._id}>
                  <td>{volunteer.name}</td>
                  <td>{volunteer.email}</td>
                  <td>
                    {volunteer.projects.length > 0 ? (
                      volunteer.projects.map((project) => <span key={project._id}>{project.title}, </span>)
                    ) : (
                      <span>No projects assigned</span>
                    )}
                  </td>
                  <td>
                    <Button color="info" size="sm" onClick={() => handleProjectAssignClick(volunteer)}>
                      <FaEdit className="mr-1" /> Assign Project
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal for assigning project to volunteer */}
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Assign Project to {selectedVolunteer?.name}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="project">Select Project</Label>
                <Input
                  type="select"
                  name="project"
                  id="project"
                  value={assignProjectId}
                  onChange={(e) => setAssignProjectId(e.target.value)}
                >
                  <option value="" disabled>
                    Select a project
                  </option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={assignVolunteerToProject}>
              Assign Project
            </Button>{' '}
            <Button color="secondary" onClick={toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </DashboardLayout>
  );
};

export default VolunteerListPage;
