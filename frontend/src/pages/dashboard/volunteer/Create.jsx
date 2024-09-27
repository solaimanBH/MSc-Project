import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '$src/constants/base';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import DashboardLayout from '$src/components/layout/Dashboard/Layoutv2'; // Assuming you have a dashboard layout

const AddVolunteerPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch projects to assign volunteer
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE}/projects`, {
          headers: {
            Authorization: authHeader,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error(err);

        setError('Error fetching projects');
      }
    };

    fetchProjects();
  }, [authHeader]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data to send to the backend
    const volunteerData = {
      name,
      email,
      password: 'password123', // Default password
      role: 'volunteer',
      projects: [projectId], // Assigned project
    };

    try {
      const response = await fetch(`${API_BASE}/volunteers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(volunteerData),
      });

      if (!response.ok) {
        throw new Error('Failed to add volunteer');
      }

      setSuccess('Volunteer added successfully!');
      setError('');

      // Reset form fields after success
      setName('');
      setEmail('');
      setProjectId('');

      setTimeout(() => {
        navigate('/dashboard'); // Redirect to volunteer list page after success
      }, 1500);
    } catch (err) {
      console.error(err);

      setError('Error adding volunteer');
      setSuccess('');
    }
  };

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <h2 className="text-center mb-4">Add New Volunteer</h2>

            {error && <Alert color="danger">{error}</Alert>}
            {success && <Alert color="success">{success}</Alert>}

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="name">Volunteer Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="email">Volunteer Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label for="project">Assign to Project</Label>
                <Input
                  type="select"
                  name="project"
                  id="project"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a Project</option>
                  {projects.length > 0 && projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.title}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <Button color="primary" block type="submit">
                <FaPlus className="mr-2" /> Add Volunteer
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default AddVolunteerPage;
