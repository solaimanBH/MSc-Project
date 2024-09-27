import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../../../constants/base';

const BlogEditPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE}/blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
        setTags(data.tags.join(', '));
        setImageUrl(data.imageUrl);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedBlog = {
      title,
      content,
      author,
      tags,
      imageUrl,
    };

    try {
      const response = await fetch(`${API_BASE}/blog/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      setSuccess('Blog updated successfully!');
      setTimeout(() => {
        navigate(`/dashboard/blogs/${id}`);
      }, 2000); // Redirect to blog details page after 2 seconds
    } catch (error) {
      setError('Failed to update blog.');
    }
  };

  return (
    <DashboardLayout>
      <Container fluid className="py-5">
        <Container>
          <Row className="mb-5 text-center">
            <Col md="12">
              <h1>Edit Blog</h1>
            </Col>
          </Row>

          {loading && <p>Loading...</p>}
          {error && <Alert color="danger">{error}</Alert>}
          {success && <Alert color="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
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
                rows="8"
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
              <Label for="tags">Tags (comma-separated)</Label>
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
              {imageUrl && <img src={imageUrl} alt="Blog Cover" className="img-fluid mt-2" />}
            </FormGroup>

            <Button color="primary" type="submit">Update Blog</Button>
          </Form>
        </Container>
      </Container>
    </DashboardLayout>
  );
};

export default BlogEditPage;
