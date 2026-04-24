import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">
            Book Doctor Appointments<br />Easily & Instantly
          </h1>
          <p className="lead mb-4 opacity-75">
            Find the right doctor, choose your time slot, and get confirmed in seconds.
          </p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <button className="btn btn-light btn-lg px-4 fw-semibold" onClick={() => navigate('/doctors')}>
              🔍 Find a Doctor
            </button>
            <button className="btn btn-outline-light btn-lg px-4" onClick={() => navigate('/register')}>
              📝 Register Now
            </button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-5">How It Works</h2>
        <div className="row g-4">
          {[
            { icon: '🔍', title: 'Search Doctor', desc: 'Find doctors by specialization, hospital, or name', color: '#dbeafe' },
            { icon: '📅', title: 'Book a Slot', desc: 'Choose a convenient date and available time slot', color: '#dcfce7' },
            { icon: '✅', title: 'Get Confirmed', desc: 'Receive instant confirmation notification', color: '#fef9c3' },
            { icon: '👨‍⚕️', title: 'Consult Doctor', desc: 'Visit the doctor at your scheduled appointment', color: '#fce7f3' },
          ].map((step, i) => (
            <div key={step.title} className="col-sm-6 col-md-3">
              <div className="card h-100 border-0 shadow-sm text-center p-3 doctor-card">
                <div className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 70, height: 70, background: step.color, fontSize: 32 }}>
                  {step.icon}
                </div>
                <div className="card-body p-0">
                  <div className="badge bg-primary rounded-pill mb-2">Step {i + 1}</div>
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="text-muted small">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specializations */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Specializations</h2>
          <div className="row g-3 justify-content-center">
            {[
              { icon: '🫀', name: 'Cardiologist' },
              { icon: '🧠', name: 'Neurologist' },
              { icon: '🦴', name: 'Orthopedist' },
              { icon: '👶', name: 'Pediatrician' },
              { icon: '🌿', name: 'Dermatologist' },
              { icon: '👁️', name: 'Ophthalmologist' },
              { icon: '🦷', name: 'Dentist' },
              { icon: '🩺', name: 'General Physician' },
            ].map((spec) => (
              <div key={spec.name} className="col-6 col-sm-4 col-md-3">
                <div className="card border-0 shadow-sm text-center p-3 doctor-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/doctors')}>
                  <div style={{ fontSize: 36 }}>{spec.icon}</div>
                  <p className="mb-0 fw-semibold small mt-2">{spec.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-white text-center py-4" style={{ background: '#1e40af' }}>
        <p className="mb-0">© 2026 DocBook — Doctor Appointment Booking System | SRMAP University</p>
      </footer>
    </div>
  );
};

export default Home;