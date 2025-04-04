import React, { useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { logout } from '../../actions/userAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  
  const logoutHandler = () => {
    dispatch(logout);
    navigate('/'); // Redirect to home after logout
  };

  const [menu, setMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="imgnav">
        <img src="../images/Logo.png" alt="logo" className="Logo" />
        <i className="fa-solid fa-bars bar d-lg-none d-md-flex" onClick={() => setMenu(!menu)}></i>
      </div>

      <div id="lisiis" className={menu ? "open" : ""}>
        <ul className="navbar-menu">
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/products')}>Products</li>
          <li onClick={() => navigate('/About')}>About-us</li>
          <li onClick={() => navigate('/contact')}>Contact-us</li>
        </ul>

        <div className="navbar-right">
          {isAuthenticated && user.role === 'admin' ? (
            <Dropdown className="d-inline">
              <Dropdown.Toggle className="btn btn-danger position-relative px-3" id="dropdown-basic">
                <li>{user.name}</li>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/admin/dashboard')} className="text-dark">
                  Dashboard
                </Dropdown.Item>
                <Dropdown.Item onClick={logoutHandler} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : null}

          <Link to={'/Mycart'}>
            <button>Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
