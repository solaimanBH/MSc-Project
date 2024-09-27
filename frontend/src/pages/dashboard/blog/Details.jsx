import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Col, Container, Row, Spinner } from 'reactstrap';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../../../constants/base';

const DashboardBlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_BASE}/blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/blog/${id}`)
      if (!res.ok) {
        setError('Unable to delete blog!')
      }
      navigate('/dashboard/blogs')
    } catch (error) {
      console.error(error);
      setError(error.message)
    }
  }

  return (
    <DashboardLayout>
      <Container fluid className="py-5">
        <Container>
          {loading && (
            <Row className="justify-content-center">
              <Spinner color="primary" />
            </Row>
          )}

          {error && (
            <Row className="justify-content-center">
              <Col md="6">
                <Alert color="danger">{error}</Alert>
              </Col>
            </Row>
          )}

          {blog && (
            <>
              <Row className="mb-5 text-center">
                <Col md="12">
                  <h1>{blog.title}</h1>
                  <p className="lead">By {blog.author}</p>
                </Col>
              </Row>
              <Row>
                <Col md="8" className="mx-auto">
                  {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="img-fluid rounded mb-4" />}
                  <p>{blog.content}</p>
                  <Link to={`/dashboard/blogs/edit/${blog._id}`} className="btn btn-secondary" style={{ marginRight: 2 }}>Edit Blog</Link>
                  <Link to="/dashboard/blogs" className="btn btn-primary" style={{ marginRight: 2 }}>Back to Blogs</Link>
                  <Button onClick={() => handleDelete(blog._id)} color="warning">Delete Blog</Button>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardBlogDetailPage;
