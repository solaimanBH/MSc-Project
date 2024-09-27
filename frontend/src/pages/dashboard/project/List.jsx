import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button, Alert, CardImg, Input } from 'reactstrap';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { API_BASE } from '../../../constants/base';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { Link } from 'react-router-dom';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const authHeader = useAuthHeader();
  const user = useAuthUser()

  useEffect(() => {
    // Fetch projects from API
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_BASE + '/projects', {
          method: 'GET',
          headers: {
            Authorization: authHeader, // Ensure authHeader is treated as a function returning a string
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); // Initialize filtered projects
      } catch (err) {
        setError('Failed to fetch projects.');
      }
    };

    fetchProjects();
  }, [authHeader]);

  // Function to limit description length
  const limitDescription = (description) => {
    return description.length > 120 ? description.substring(0, 120) + '...' : description;
  };

  // Function to handle search and filter projects
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = projects.filter((project) => {
      const inTitle = project.title.toLowerCase().includes(query);
      const inDescription = project.description.toLowerCase().includes(query);
      const inTags = project.tags.some(tag => tag.toLowerCase().includes(query));
      const inCategory = project.category.toLowerCase().includes(query);
      const inVolunteers = project.volunteers.some(volunteer => volunteer.name.toLowerCase().includes(query));

      return inTitle || inDescription || inTags || inCategory || inVolunteers;
    });

    setFilteredProjects(filtered);
  };
  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(API_BASE + '/projects/' + projectId, {
        method: 'DELETE',
        headers: {
          Authorization: authHeader, // Ensure authHeader is treated as a function returning a string
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProjects(data);
      setFilteredProjects(data); // Initialize filtered projects
    } catch (err) {
      setError('Failed to delete project.');
    }
  };

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        {/* Alert for errors */}
        {error && <Alert color="danger">{error}</Alert>}

        <Row className="mb-4">
          <Col md="12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2>Projects</h2>
              <Link className="btn btn-primary" to="/dashboard/projects/create">
                <FaPlus className="mr-2" /> Create New Project
              </Link>
            </div>
          </Col>
        </Row>

        {/* Search Bar */}
        <Row className="mb-4">
          <Col md="12">
            <Input
              type="text"
              placeholder="Search projects by title, tags, category, volunteers..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </Col>
        </Row>

        <Row>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Col md="4" sm="6" key={project._id} className="mb-4">
                <Card className="border-light shadow-sm">
                  {/* Cover Image (if available) */}
                  {project.coverImage && project.coverImage.imagePath && (
                    <CardImg
                      top
                      src={project.coverImage.imagePath}
                      alt={`Cover for ${project.title}`}
                      style={{ height: '200px', objectFit: 'cover' }} // Fixed height with aspect ratio preserved
                    />
                  )}
                  <CardBody>
                    <CardTitle tag="h5">
                      <Link to={`/dashboard/projects/${project._id}`}>
                        {project.title}
                      </Link>
                    </CardTitle>
                    {/* Limited description */}
                    <CardText>{limitDescription(project.description)}</CardText>
                    <CardText className="font-weight-bold">
                      Goal: &pound;{project.goalAmount.toLocaleString()} | Current: &pound;{project.currentAmount.toLocaleString()}
                    </CardText>
                    <div className="d-flex justify-content-between">
                      {user.role === 'admin' && <Link to={`/dashboard/projects/edit/${project._id}`} className="btn btn-info">
                        <FaEdit className="mr-1" /> Edit
                      </Link>}
                      {user.role === 'admin' && <Button color="danger" size="sm" onClick={() => handleDelete(project._id)}>
                        <FaTrash className="mr-1" /> Delete
                      </Button>}
                    </div>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <Col md="12">
              <Card body className="text-center">
                <CardTitle tag="h5">No Projects Found</CardTitle>
                <CardText>Try searching for a different project.</CardText>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default ProjectListPage;
