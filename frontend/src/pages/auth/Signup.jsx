import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import { API_BASE } from '../../constants/base';
import styles from './Signup.module.scss';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSuccess('Registration successful! Please check your email for verification.');
        setFormData({ name: '', email: '', password: '' });
        navigate('/login'); // Navigate to login page after successful signup
      } else {
        const errorData = await res.json();
        setError(errorData.msg || 'Server error');
      }
    } catch (error) {
      console.error(error);
      setError('Server error');
    }
  };

  return (
    <div className={styles.center}>
      <Form onSubmit={handleSubmit}>
        <h3 className={styles.title}>
          <FaUser className={styles.icon} /> Sign Up
        </h3>
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
        <FormGroup floating>
          <Input
            id="name"
            name="name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={handleChange}
            required
          />
          <Label for="name">
            <FaUser className={styles.icon} /> Name
          </Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
          <Label for="email">
            <FaEnvelope className={styles.icon} /> Email
          </Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleChange}
            required
          />
          <Label for="password">
            <FaLock className={styles.icon} /> Password
          </Label>
        </FormGroup>
        <Button color="primary" type="submit" block>
          <FaSignInAlt className={styles.buttonIcon} /> Sign Up
        </Button>
        <br />
        <Link to="/login" className={styles.link}>
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
};

export default Signup;
