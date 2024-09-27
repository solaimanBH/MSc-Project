import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../../constants/base';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaTint, FaSignInAlt } from 'react-icons/fa';

const VolunteerSignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [interests, setInterests] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [address, setAddress] = useState({
    city: '',
    state: '',
    postalCode: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const authHeader = useAuthHeader();

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const signupData = {
      name,
      email,
      password,
      role: 'volunteer', // Explicitly setting the role to volunteer
      interests: interests.split(',').map(interest => interest.trim()), // Convert interests string to array
      bloodGroup,
      address
    };

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(signupData),
      });

      if (!res.ok) {
        throw new Error('Failed to sign up');
      }

      const data = await res.json();
      setSuccess('Volunteer signed up successfully!');
      setError('');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after signup
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <Container className="my-5">
      <Form onSubmit={handleSubmit} style={{ maxWidth: '100% !important' }}>
        <h2 className="text-center mb-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FaUser className="mr-2" /> Sign Up as Volunteer
        </h2>

        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        <Row>
          {/* Name */}
          <Col md="6">
            <FormGroup>
              <Label for="name">
                <FaUser className="mr-2" /> Name
              </Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
          </Col>

          {/* Email */}
          <Col md="6">
            <FormGroup>
              <Label for="email">
                <FaEnvelope className="mr-2" /> Email
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          {/* Password */}
          <Col md="6">
            <FormGroup>
              <Label for="password">
                <FaLock className="mr-2" /> Password
              </Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>
          </Col>

          {/* Confirm Password */}
          <Col md="6">
            <FormGroup>
              <Label for="confirmPassword">
                <FaLock className="mr-2" /> Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        {/* Address Section */}
        <h5 className="mt-4 mb-3">Address</h5>
        <Row>
          {/* City */}
          <Col md="4">
            <FormGroup>
              <Label for="city">
                <FaMapMarkerAlt className="mr-2" /> City
              </Label>
              <Input
                type="text"
                id="city"
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
              />
            </FormGroup>
          </Col>

          {/* State */}
          <Col md="4">
            <FormGroup>
              <Label for="state">
                <FaMapMarkerAlt className="mr-2" /> State
              </Label>
              <Input
                type="text"
                id="state"
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                required
              />
            </FormGroup>
          </Col>

          {/* Postal Code */}
          <Col md="4">
            <FormGroup>
              <Label for="postalCode">
                <FaMapMarkerAlt className="mr-2" /> Postal Code
              </Label>
              <Input
                type="text"
                id="postalCode"
                name="postalCode"
                value={address.postalCode}
                onChange={handleAddressChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          {/* Blood Group */}
          <Col md="6">
            <FormGroup>
              <Label for="bloodGroup">
                <FaTint className="mr-2" /> Blood Group
              </Label>
              <Input
                type="select"
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Input>
            </FormGroup>
          </Col>

          {/* Interests */}
          <Col md="6">
            <FormGroup>
              <Label for="interests">
                <FaUser className="mr-2" /> Interests (comma)
              </Label>
              <Input
                type="text"
                id="interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g. education, environment, community"
                required
              />
            </FormGroup>
          </Col>
        </Row>

        {/* Submit Button */}
        <Button color="primary" type="submit" block className="mt-4">
          <FaSignInAlt className="mr-2" /> Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default VolunteerSignupForm;
