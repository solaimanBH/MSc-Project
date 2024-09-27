import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate, Link } from 'react-router-dom'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const Navbar = () => {
  const navigate = useNavigate()
  const signOut = useSignOut()
  const user = useAuthUser()

  const logout = () => {
    signOut()
    navigate('/')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" style={{ zIndex: '1000', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', paddingLeft: '260px', paddingRight: '10px' }}>
      <Link className="navbar-brand" to="/dashboard">Dashboard</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav" style={{ marginLeft: 'auto' }}>
          <li className="nav-item">
            <span className="nav-link">Welcome Back, {user.name}!</span>
          </li>
          <li className="nav-item">
            <a className="nav-link" style={{ cursor: 'pointer' }} onClick={logout}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
