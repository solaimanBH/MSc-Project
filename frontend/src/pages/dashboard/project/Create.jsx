import React, { useState } from 'react';
import { Container, Form, FormGroup, Label, Input, Button, Alert, Row, Col, Card, CardBody, CardImg } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../../../constants/base';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const ProjectCreationPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [galleryImagesUrls, setGalleryImagesUrls] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!description) errors.description = 'Description is required';
    if (!category) errors.category = 'Category is required';
    if (!goalAmount || isNaN(goalAmount) || goalAmount <= 0) errors.goalAmount = 'Valid goal amount is required';

    const tagsArray = tags.split(',').map(tag => tag.trim());
    const uniqueTags = new Set(tagsArray);
    if (uniqueTags.size !== tagsArray.length) {
      errors.tags = 'Tags must be unique';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const tagsArray = tags.split(',').map(tag => tag.trim());

    const galleryImages = galleryImagesUrls.split(',').map(url => url.trim()).filter(url => url !== '');

    const projectData = {
      title,
      description,
      category,
      tags: tagsArray,
      goalAmount: parseFloat(goalAmount),
      coverImage: { imagePath: coverImageUrl },
      gallery: galleryImages.map((url) => ({ imagePath: url })),
    };

    try {
      const response = await fetch(API_BASE + '/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      setSuccess('Project created successfully!');
      setError('');
      setFormErrors({});
      setTitle('');
      setDescription('');
      setCategory('');
      setTags('');
      setGoalAmount('');
      setCoverImageUrl('');
      setGalleryImagesUrls('');

      navigate('/dashboard/projects');
    } catch (err) {
      setError('Failed to create project.');
      setSuccess('');
    }
  };

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Create New Project</h2>
        </div>

        {/* Alert for errors and success */}
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        {/* Adjust the Col and Row to make the form take up more space */}
        <Row className="justify-content-center">
          <Col md={10}> {/* Set md to a higher value to make the form wider */}
            <Form onSubmit={handleSubmit} style={{ maxWidth: '100% !important' }}>
              <FormGroup className={formErrors.title ? 'has-error' : ''}>
                <Label for="title">Project Title</Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  invalid={!!formErrors.title}
                  required
                />
                {formErrors.title && <div className="invalid-feedback">{formErrors.title}</div>}
              </FormGroup>
              <FormGroup className={formErrors.description ? 'has-error' : ''}>
                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  invalid={!!formErrors.description}
                  required
                />
                {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
              </FormGroup>
              <FormGroup className={formErrors.category ? 'has-error' : ''}>
                <Label for="category">Category</Label>
                <Input
                  type="select"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  invalid={!!formErrors.category}
                  required
                >
                  <option value="" disabled>Select Category</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="environment">Environment</option>
                  <option value="community">Community</option>
                </Input>
                {formErrors.category && <div className="invalid-feedback">{formErrors.category}</div>}
              </FormGroup>

              {/* Tags Input */}
              <FormGroup className={formErrors.tags ? 'has-error' : ''}>
                <Label for="tags">Tags (comma separated, must be unique)</Label>
                <Input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  invalid={!!formErrors.tags}
                />
                {formErrors.tags && <div className="invalid-feedback">{formErrors.tags}</div>}
              </FormGroup>

              <FormGroup className={formErrors.goalAmount ? 'has-error' : ''}>
                <Label for="goalAmount">Goal Amount ($)</Label>
                <Input
                  type="number"
                  id="goalAmount"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  invalid={!!formErrors.goalAmount}
                  required
                />
                {formErrors.goalAmount && <div className="invalid-feedback">{formErrors.goalAmount}</div>}
              </FormGroup>

              {/* Cover Image URL Input */}
              <FormGroup>
                <Label for="coverImageUrl">Cover Image URL</Label>
                <Input
                  type="text"
                  id="coverImageUrl"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                />
                {coverImageUrl && (
                  <Card className="mt-3">
                    <CardBody>
                      <CardImg top width="100%" src={coverImageUrl} alt="Cover Image Preview" />
                    </CardBody>
                  </Card>
                )}
              </FormGroup>

              {/* Gallery Images URL Input */}
              <FormGroup>
                <Label for="galleryImagesUrls">Gallery Image URLs (comma separated)</Label>
                <Input
                  type="text"
                  id="galleryImagesUrls"
                  value={galleryImagesUrls}
                  onChange={(e) => setGalleryImagesUrls(e.target.value)}
                />
                {galleryImagesUrls && (
                  <Row className="mt-3">
                    {galleryImagesUrls.split(',').map((url, index) => (
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

              <Button color="primary" type="submit" className="mt-4">
                <FaPlus className="mr-2" /> Create Project
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default ProjectCreationPage;
