import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, CardBody, CardText, CardTitle, Col, Container, Input, Row, Spinner } from 'reactstrap';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { API_BASE } from '../../../constants/base';

const DashboardBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(API_BASE + '/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
        setFilteredBlogs(data); // Set filtered blogs as the full list initially
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query) || blog.content.toLowerCase().includes(query)
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs); // Reset to all blogs when query is empty
    }
  };

  // Navigate to Create Blog page
  const handleCreateBlog = () => {
    navigate('/dashboard/blog/create');
  };

  return (
    <DashboardLayout>
      <Container fluid className="py-5" style={{ backgroundColor: '#f9f9f9' }}>
        <Container>
          {/* Header Section */}
          <Row className="mb-4 text-center">
            <Col md="12">
              <h1 className="display-4">Our Blog</h1>
              <p className="lead mt-3">Stay updated with the latest stories, insights, and inspiration from our community.</p>
            </Col>
          </Row>

          {/* Search bar and Create Blog button */}
          <Row className="mb-4">
            <Col md="8">
              <Input
                type="search"
                placeholder="Search blog posts by title or content..."
                value={searchQuery}
                onChange={handleSearch}
              />
            </Col>
            <Col md="4" className="text-right">
              <Button color="success" onClick={handleCreateBlog}>Create New Blog</Button>
            </Col>
          </Row>

          {/* Show loading spinner while fetching data */}
          {loading && (
            <Row className="justify-content-center">
              <Spinner color="primary" />
            </Row>
          )}

          {/* Show error if fetching fails */}
          {error && (
            <Row className="justify-content-center">
              <Col md="6">
                <Alert color="danger">{error}</Alert>
              </Col>
            </Row>
          )}

          {/* Show blog posts */}
          <Row>
            {!loading && filteredBlogs.length > 0 && filteredBlogs.map((blog) => (
              <Col md="4" key={blog._id} className="mb-4">
                <Card className="h-100">
                  {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} className="card-img-top" />}
                  <CardBody>
                    <CardTitle tag="h5">{blog.title}</CardTitle>
                    <CardText>{blog.content.substring(0, 150)}...</CardText>
                    <CardText><small className="text-muted">By {blog.author}</small></CardText>
                    <Link to={`/dashboard/blogs/${blog._id}`} className="btn btn-primary">Read More</Link>
                  </CardBody>
                </Card>
              </Col>
            ))}

            {!loading && filteredBlogs.length === 0 && (
              <Col md="12" className="text-center">
                <p>No blogs match your search.</p>
              </Col>
            )}
          </Row>
        </Container>
      </Container>
    </DashboardLayout>
  );
};

export default DashboardBlogsPage;
