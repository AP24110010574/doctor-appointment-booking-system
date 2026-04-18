import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#1e40af' }}>
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4" to="/">🏥 DocBook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {!userInfo ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light btn-sm px-3" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <>
                {userInfo.role === 'patient' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/doctors">Find Doctors</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/dashboard/patient">My Appointments</Link>
                    </li>
                  </>
                )}
                {userInfo.role === 'doctor' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/doctor">My Dashboard</Link>
                  </li>
                )}
                {userInfo.role === 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/admin">Admin Panel</Link>
                  </li>
                )}
                <li className="nav-item">
                  <span className="nav-link text-warning fw-semibold">Hi, {userInfo.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger btn-sm px-3" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;