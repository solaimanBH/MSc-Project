import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Logo from '../shared/Logo'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate, Link } from 'react-router-dom'

const JaagoNavbar = () => {
  const authUser = useAuthUser();
  const logout = useSignOut()
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const toggleNavbar = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <Logo color="primary" /> Jaago Foundation
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {authUser && (
            <NavItem>
              <NavLink>
                <Link to="/dashboard">Dashboard</Link>
              </NavLink>
            </NavItem>
          )}
          <NavItem>
            <NavLink>
              <Link to="/about">About Us</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/projects">Projects</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/contact">Contact</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Link to="/blog">Blog</Link>
            </NavLink>
          </NavItem>
          {authUser ? (
            <NavItem>
              <NavLink onClick={() => { logout(); navigate('/'); }} style={{ cursor: 'pointer' }}>
                Logout
              </NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <NavLink>
                <Link to="/login">Login</Link>
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default JaagoNavbar;
