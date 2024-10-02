import { NavLink } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../store/auth';

export const Header = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <header className="site-header  ">
        <div className="wrap header--wrap">
          <div className="site-logo">
            <NavLink to="/">Rahul Mali</NavLink>
          </div>
          <div className="navbar">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="/client/all-items">Client</NavLink>
                  </li>
                  <li>
                    <NavLink to="/logout">Logout</NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};
