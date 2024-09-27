import React, { useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Card, CardBody, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../../../constants/base';

const BlogCreationPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const blogPost = {
      title,
      content,
      author,
      tags,
      imageUrl,
    };

    try {
      const response = await fetch(`${API_BASE}/blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(blogPost),
      });

      if (!response.ok) {
        throw new Error('Error creating blog post');
      }

      setSuccess('Blog post created successfully!');
      setError('');
      navigate('/dashboard/blogs');
    } catch (error) {
      setError('Failed to create blog post.');
    }
  };

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        <h2>Create New Blog Post</h2>

        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="content">Content</Label>
                <Input
                  type="textarea"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows="10"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="tags">Tags (comma separated)</Label>
                <Input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="imageUrl">Image URL</Label>
                <Input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && (
                  <Card className="mt-3">
                    <CardBody>
                      <img src={imageUrl} alt="Preview" className="img-fluid" />
                    </CardBody>
                  </Card>
                )}
              </FormGroup>
              <Button color="primary" type="submit">
                <FaPlus className="mr-2" /> Create Blog Post
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </DashboardLayout>
  );
};

export default BlogCreationPage;
