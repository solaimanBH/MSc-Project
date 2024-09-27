import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button, Input, Table, Pagination, PaginationItem, PaginationLink, Badge } from 'reactstrap';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { API_BASE } from '../../../constants/base';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { useNavigate } from 'react-router-dom';

const DonationsPage = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('date');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [donationsPerPage] = useState(10);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${API_BASE}/donations`, {
          headers: {
            Authorization: `Bearer ${authHeader}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch donations');
        }

        const data = await response.json();
        setDonations(data);
      } catch (err) {
        setError('Error fetching donation data');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [authHeader]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSort = (e) => {
    setSortField(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleViewProject = (projectId) => {
    navigate(`/dashboard/projects/${projectId}`);
  };

  // Filter, Search, and Sort logic
  const filteredDonations = donations
    .filter((donation) =>
      filter === 'all' || donation.project?.category === filter
    )
    .filter(
      (donation) =>
        donation.anonymous ||
        donation.user?.name.toLowerCase().includes(searchQuery) ||
        donation.project?.title.toLowerCase().includes(searchQuery)
    )
    .sort((a, b) => {
      if (sortField === 'amount') {
        return b.amount - a.amount;
      } else if (sortField === 'date') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortField === 'category') {
        return a.project?.category?.localeCompare(b.project?.category);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastDonation = currentPage * donationsPerPage;
  const indexOfFirstDonation = indexOfLastDonation - donationsPerPage;
  const currentDonations = filteredDonations.slice(indexOfFirstDonation, indexOfLastDonation);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <DashboardLayout>
        <Container className="text-center">
          <Spinner color="primary" />
        </Container>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <Container>
          <Alert color="danger">{error}</Alert>
        </Container>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Container fluid className="p-4">
        <Row className="mb-4">
          <Col md="12">
            <h2 className="mb-4">Donations</h2>

            {/* Search, Sort, and Filter Controls */}
            <Row className="mb-4 g-3">
              <Col md="4">
                <Input
                  type="text"
                  placeholder="Search by donor or project"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="shadow-sm"
                  style={{ borderRadius: '4px', padding: '0.5rem' }}
                />
              </Col>
              <Col md="4">
                <Input type="select" value={sortField} onChange={handleSort} className="shadow-sm" style={{ borderRadius: '4px' }}>
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                  <option value="category">Sort by Category</option>
                </Input>
              </Col>
              <Col md="4">
                <Input type="select" value={filter} onChange={handleFilter} className="shadow-sm" style={{ borderRadius: '4px' }}>
                  <option value="all">All Categories</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="environment">Environment</option>
                </Input>
              </Col>
            </Row>

            {/* Donation Table */}
            <Table responsive hover className="text-center align-middle shadow-sm" style={{ borderRadius: '8px' }}>
              <thead className="bg-light">
                <tr>
                  <th className="fw-semibold">#</th>
                  <th className="fw-semibold">Donor</th>
                  <th className="fw-semibold">Amount (&pound;)</th>
                  <th className="fw-semibold">Project</th>
                  <th className="fw-semibold">Category</th>
                  <th className="fw-semibold">Date</th>
                  <th className="fw-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentDonations.length > 0 ? (
                  currentDonations.map((donation, index) => (
                    <tr key={donation._id}>
                      <th scope="row" className="fw-light">{indexOfFirstDonation + index + 1}</th>
                      <td className="fw-light">{donation.anonymous ? 'Anonymous' : donation.user?.name}</td>
                      <td className="fw-light">&pound;{donation.amount.toLocaleString()}</td>
                      <td className="fw-light">{donation.project?.title || 'No Project'}</td>
                      <td className="fw-light">{donation.project?.category || 'N/A'}</td>
                      <td className="fw-light">{new Date(donation.createdAt).toLocaleDateString()}</td>
                      <td>
                        {donation.project ? (
                          <Button
                            color="primary"
                            size="sm"
                            style={{ borderRadius: '4px', padding: '0.3rem 0.6rem' }}
                            onClick={() => handleViewProject(donation.project?._id)}
                          >
                            View Project
                          </Button>
                        ) : (
                          'No Project'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No donations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            <Pagination aria-label="Donation pagination" className="mt-4 justify-content-center">
              {[...Array(Math.ceil(filteredDonations.length / donationsPerPage))].map((_, i) => (
                <PaginationItem key={i} active={i + 1 === currentPage}>
                  <PaginationLink onClick={() => paginate(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
};

export default DonationsPage;
