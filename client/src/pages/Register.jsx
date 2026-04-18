import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'patient',
    phone: '', specialization: '', experience: '', fee: '', hospital: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      toast.success('Registered successfully! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <div style={{ fontSize: 48 }}>📝</div>
                <h3 className="fw-bold text-primary">Create Account</h3>
                <p className="text-muted">Join DocBook today</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Full Name</label>
                  <input name="name" className="form-control" value={form.name}
                    onChange={handleChange} placeholder="Your full name" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email Address</label>
                  <input type="email" name="email" className="form-control" value={form.email}
                    onChange={handleChange} placeholder="Your email" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input type="password" name="password" className="form-control" value={form.password}
                    onChange={handleChange} placeholder="Create a password" required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Phone Number</label>
                  <input name="phone" className="form-control" value={form.phone}
                    onChange={handleChange} placeholder="Your phone number" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Register As</label>
                  <select name="role" className="form-select" value={form.role} onChange={handleChange}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                {form.role === 'doctor' && (
                  <div className="border rounded p-3 mb-3 bg-light">
                    <h6 className="fw-bold text-primary mb-3">Doctor Details</h6>
                    <div className="mb-3">
                      <label className="form-label fw-semibold">Specialization</label>
                      <select name="specialization" className="form-select" value={form.specialization} onChange={handleChange}>
                        <option value="">Select Specialization</option>
                        <option>General Physician</option>
                        <option>Cardiologist</option>
                        <option>Dermatologist</option>
                        <option>Neurologist</option>
                        <option>Orthopedist</option>
                        <option>Pediatrician</option>
                        <option>Gynecologist</option>
                        <option>Ophthalmologist</option>
                        <option>Dentist</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="form-label fw-semibold">Experience (years)</label>
                        <input type="number" name="experience" className="form-control"
                          value={form.experience} onChange={handleChange} placeholder="e.g. 5" />
                      </div>
                      <div className="col-6 mb-3">
                        <label className="form-label fw-semibold">Fee (₹)</label>
                        <input type="number" name="fee" className="form-control"
                          value={form.fee} onChange={handleChange} placeholder="e.g. 500" />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-semibold">Hospital / Clinic</label>
                      <input name="hospital" className="form-control" value={form.hospital}
                        onChange={handleChange} placeholder="Hospital or clinic name" />
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
                  {loading ? 'Creating account...' : 'Register'}
                </button>
              </form>
              <hr />
              <p className="text-center mb-0">
                Already have an account? <Link to="/login" className="text-primary fw-semibold">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;