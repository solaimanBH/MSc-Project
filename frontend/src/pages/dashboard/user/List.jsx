import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Alert, Col, Container, Input, Row, Spinner, Table, Button } from 'reactstrap';
import DashboardLayout from '../../../components/layout/Dashboard/Layoutv2';
import { useNavigate } from 'react-router-dom'
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const API_BASE = 'http://localhost:5000/api';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const authHeader = useAuthHeader()
  const authUser = useAuthUser()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_BASE}/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader
          },
        });

        if (!response.ok) {
          console.log(response.statusText);
          alert('err!')
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users to the full user list
        setLoading(false);
      } catch (err) {
        alert('err')
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search term
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (id, email) => {
    if (email === 'admin@site.com') {
      alert('Cannot delete default user')
      return
    }
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader
      }
    })

    if (!res.ok) {
      setError('Unable to delete User')
      return
    }
    navigate('/dashboard')
  }

  return (
    <DashboardLayout>
      <Container className="py-5">
        <Row className="mb-4">
          <Col md="6">
            <h2>User Management</h2>
          </Col>
          <Col md="6" className="text-right">
            <div className="d-flex">
              <Input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name, email, or role"
                className="mr-2"
              />
              <FaSearch size={20} />
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center">
            <Spinner color="primary" />
          </div>
        ) : error ? (
          <Alert color="danger">{error}</Alert>
        ) : (
          <Table hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <Button color="warning" onClick={() => handleDelete(user._id, user.email)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Container>
    </DashboardLayout>
  );
};

export default AdminUserList;
