import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  let data = useCart();
  const [view, setView] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-italic"
            to="/"
            style={{ transition: 'color 0.3s ease-in-out' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#ffcc00')}
            onMouseOut={(e) => (e.currentTarget.style.color = '')}
          >
            BiteExpress
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-4 mt-2 ms-2"
                  aria-current="page"
                  to="/"
                  style={{ transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#ffcc00';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.backgroundColor = '';
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active fs-4 mt-2 ms-2"
                  aria-current="page"
                  to="/about"
                  style={{ transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#ffcc00';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '';
                    e.currentTarget.style.backgroundColor = '';
                  }}
                >
                  About Us
                </Link>
              </li>
              {localStorage.getItem('authToken') && (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-4 mt-2 ms-2"
                    aria-current="page"
                    to="/myOrder"
                    style={{ transition: 'color 0.6s ease-in-out, background-color 0.6s ease-in-out' }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#ffcc00';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    My Orders
                  </Link>
                </li>
              )}
            </ul>
            {!localStorage.getItem('authToken') ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div
                  className="btn bg-white text-success mx-1"
                  onClick={() => setView(true)}
                >
                  My Cart{' '}
                  {data.length > 0 ? <Badge pill bg="danger">{data.length}</Badge> : ''}
                </div>
                {view && <Modal onClose={() => setView(false)}><Cart /></Modal>}
                <div className="btn bg-white text-danger mx-1" onClick={handleLogout}> Log out</div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
