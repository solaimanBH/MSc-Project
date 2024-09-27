import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const DashboardNavbar = () => {
  const logout = useSignOut()

  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand href="/">Jaago Foundation</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/settings">Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => logout()}>Logout</NavLink>
          </NavItem>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default DashboardNavbar;
