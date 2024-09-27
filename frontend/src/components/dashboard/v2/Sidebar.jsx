// src/components/Sidebar.js
import React from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { FaHandsHelping, FaHeart, FaPoundSign, FaProjectDiagram, FaTachometerAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from 'reactstrap';

const Sidebar = () => {
  const sidebarStyle = {
    width: '250px',
    height: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    paddingTop: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Light shadow
    overflowY: 'auto',
    zIndex: '1050',
  };

  const user = useAuthUser()

  const currentPath = window.location.pathname;

  return (
    <div className="bg-light" style={sidebarStyle}>
      <div className="text-center mb-4">
        <FaHeart size={40} className="text-primary" />
        <h4 className="mt-2">Jaago</h4>
      </div>
      <Nav className="flex-column">
        <Link
          to="/dashboard"
          className={`nav-link d-flex align-items-center ${currentPath === '/dashboard' ? 'bg-primary text-white' : 'text-dark'
            }`}
          style={{ padding: '12px 20px', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s', textDecoration: 'none' }}
        >
          <FaTachometerAlt style={{ marginRight: '10px' }} /> Dashboard
        </Link>
        <Link
          to={user.role === 'admin' ? "/dashboard/projects" : "/projects"}
          className={`nav-link d-flex align-items-center ${currentPath === '/dashboard/projects' ? 'bg-primary text-white' : 'text-dark'
            }`}
          style={{ padding: '12px 20px', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s', textDecoration: 'none' }}
        >
          <FaProjectDiagram style={{ marginRight: '10px' }} /> Projects
        </Link>
        <Link
          to="/donations"
          className={`nav-link d-flex align-items-center ${currentPath === '/donations' ? 'bg-primary text-white' : 'text-dark'
            }`}
          style={{ padding: '12px 20px', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s', textDecoration: 'none' }}
        >
          <FaPoundSign style={{ marginRight: '10px' }} /> Donations
        </Link>
        {user.role === 'admin' && <Link
          to="/users"
          className={`nav-link d-flex align-items-center ${currentPath === '/users' ? 'bg-primary text-white' : 'text-dark'
            }`}
          style={{ padding: '12px 20px', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s', textDecoration: 'none' }}
        >
          <FaUser style={{ marginRight: '10px' }} /> Users
        </Link>}
        {user.role === 'admin' && (
          <>
            <Link
              to="/dashboard/volunteers"
              className={`nav-link d-flex align-items-center ${currentPath === '/volunteers' ? 'bg-primary text-white' : 'text-dark'
                }`}
              style={{ padding: '12px 20px', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s', textDecoration: 'none' }}
            >
              <FaHandsHelping style={{ marginRight: '10px' }} /> Volunteers
            </Link>
            <Link
              to="/dashboard/blogs"
              className={`nav-link d-flex align-items-center ${currentPath === '/volunteers' ? 'bg-primary text-white' : 'text-dark'
                }`}
              style={{ padding: '12px 20px', borderRadius: '5px', transition: 'background-color 0.3s, color 0.3s', textDecoration: 'none' }}
            >
              <FaHandsHelping style={{ marginRight: '10px' }} /> Blog
            </Link>
          </>
        )}
      </Nav>
    </div>
  );
};

export default Sidebar;
