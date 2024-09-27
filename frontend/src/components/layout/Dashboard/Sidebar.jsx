import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const Sidebar = () => {
  return (
    <div className="bg-light text-dark vh-100 p-3">
      <h5>Dashboard</h5>
      <Nav vertical>
        <NavItem>
          <NavLink href="/dashboard" className="text-dark">Dashboard Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/projects" className="text-dark">Projects</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/donations" className="text-dark">Donations</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/users" className="text-dark">Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/reports" className="text-dark">Reports</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default Sidebar;
