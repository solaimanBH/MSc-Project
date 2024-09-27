import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert, Spinner, Card, CardImg, CardBody } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { API_BASE } from '../../../constants/base';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';

const EditProjectPage = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    category: '',
    tags: '',
    goalAmount: '',
    coverImageUrl: '',
    galleryImagesUrls: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${API_BASE}/projects/${id}`, {
          headers: {
            Authorization: authHeader,
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching project data');
        }

        const data = await response.json();
        setProjectData({
          title: data.title,
          description: data.description,
          category: data.category,
          tags: data.tags.join(', '),
          goalAmount: data.goalAmount,
          coverImageUrl: data.coverImage?.imagePath || '',
          galleryImagesUrls: data.gallery.map(img => img.imagePath).join(', '),
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching project data');
        setLoading(false);
      }
    };

    fetchProject();
  }, [authHeader, id]);

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tagsArray = projectData.tags.split(',').map(tag => tag.trim().toLowerCase());
      const galleryImages = projectData.galleryImagesUrls.split(',').map(url => url.trim());

      const updatedProject = {
        ...projectData,
        tags: tagsArray,
        coverImage: { imagePath: projectData.coverImageUrl, imageID: 'placeholder-id' },
        gallery: galleryImages.map((url, index) => ({ imagePath: url, imageID: `placeholder-id-${index}` })),
      };

      const response = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(updatedProject),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      setSuccess('Project updated successfully!');
      setError('');
      setTimeout(() => {
        navigate('/dashboard/projects');
      }, 1500);
    } catch (err) {
      setError('Error updating project');
      setSuccess('');
    }
  };

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <h2 className="text-center mb-4">Edit Project</h2>

            {loading ? (
              <div className="text-center">
                <Spinner color="primary" />
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                {error && <Alert color="danger">{error}</Alert>}
                {success && <Alert color="success">{success}</Alert>}

                <FormGroup>
                  <Label for="title">Project Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={projectData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    value={projectData.description}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="select"
                    name="category"
                    id="category"
                    value={projectData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="education">Education</option>
                    <option value="health">Health</option>
                    <option value="environment">Environment</option>
                    <option value="community">Community</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="tags">Tags (comma separated)</Label>
                  <Input
                    type="text"
                    name="tags"
                    id="tags"
                    value={projectData.tags}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="goalAmount">Goal Amount ($)</Label>
                  <Input
                    type="number"
                    name="goalAmount"
                    id="goalAmount"
                    value={projectData.goalAmount}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                {/* Cover Image URL Input */}
                <FormGroup>
                  <Label for="coverImageUrl">Cover Image URL</Label>
                  <Input
                    type="text"
                    name="coverImageUrl"
                    id="coverImageUrl"
                    value={projectData.coverImageUrl}
                    onChange={handleChange}
                  />
                  {projectData.coverImageUrl && (
                    <Card className="mt-3">
                      <CardBody>
                        <CardImg top width="100%" src={projectData.coverImageUrl} alt="Cover Image Preview" />
                      </CardBody>
                    </Card>
                  )}
                </FormGroup>

                {/* Gallery Images URL Input */}
                <FormGroup>
                  <Label for="galleryImagesUrls">Gallery Image URLs (comma separated)</Label>
                  <Input
                    type="text"
                    name="galleryImagesUrls"
                    id="galleryImagesUrls"
                    value={projectData.galleryImagesUrls}
                    onChange={handleChange}
                  />
                  {projectData.galleryImagesUrls && (
                    <Row className="mt-3">
                      {projectData.galleryImagesUrls.split(',').map((url, index) => (
                        <Col md="4" key={index} className="mb-3">
                          <Card>
                            <CardBody>
                              <CardImg top width="100%" src={url.trim()} alt={`Gallery Image ${index + 1}`} />
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                </FormGroup>

                <Button color="primary" block type="submit">
                  <FaSave className="mr-2" /> Save Changes
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default EditProjectPage;
