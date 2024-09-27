import { useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, Alert } from 'reactstrap';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { API_BASE } from '../../constants/base';
import styles from './Login.module.scss';

const Login = () => {
  const [loginPayload, setLoginPayload] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const linkRef = useRef();
  const signIn = useSignIn()

  const { email, password } = loginPayload;

  const handleChange = (e) => {
    setLoginPayload({ ...loginPayload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      if (res.ok) {
        const data = await res.json();
        const token = data.token;
        const userRes = await fetch(`${API_BASE}/auth`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const user = await userRes.json();
        if (user) {
          signIn({
            auth: {
              token,
              type: 'Bearer',
            },
            userState: user,
          });
          if (location?.state?.mode === 'donation') {
            linkRef?.current?.click();
          }
          navigate(location?.state?.previousUrl ?? '/dashboard');
        }
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
      <a href="https://donate.stripe.com/test_bIYg0S7Rdakp24wfYY" style={{ visibility: 'hidden' }} ref={linkRef}>Google</a>
      <Form onSubmit={handleSubmit}>
        <h3 className={styles.title}>
          <FaSignInAlt className={styles.icon} /> Login
        </h3>
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
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
          <FaSignInAlt className={styles.buttonIcon} /> Login
        </Button>
        <br />
        <Link to="/register" className={styles.link}>
          Don't have an account? Sign up
        </Link>
      </Form>
    </div>
  );
};

export default Login;
