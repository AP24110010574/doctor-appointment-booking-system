import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';
import { loginUser } from '../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await loginUser({ email, password });
      dispatch(setCredentials(data));
      toast.success('Login successful!');
      if (data.role === 'admin') navigate('/dashboard/admin');
      else if (data.role === 'doctor') navigate('/dashboard/doctor');
      else navigate('/dashboard/patient');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div style={{ fontSize: 48 }}>🏥</div>
                <h3 className="fw-bold text-primary">Login to DocBook</h3>
                <p className="text-muted">Welcome back!</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email" className="form-control" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" required />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Password</label>
                  <input type="password" className="form-control" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" required />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold"
                  disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
              <hr />
              <p className="text-center mb-0">
                Don't have an account? <Link to="/register" className="text-primary fw-semibold">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;