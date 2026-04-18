import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors } from '../services/api';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => { fetchDoctors(); }, [search, specialization]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data } = await getAllDoctors({ search, specialization });
      setDoctors(data);
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">🔍 Find a Doctor</h2>

      {/* Filters */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input className="form-control" placeholder="Search by doctor name..."
                value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="col-md-4">
              <select className="form-select" value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}>
                <option value="">All Specializations</option>
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
            <div className="col-md-2">
              <button className="btn btn-outline-secondary w-100"
                onClick={() => { setSearch(''); setSpecialization(''); }}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2 text-muted">Loading doctors...</p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-5">
          <div style={{ fontSize: 64 }}>🔍</div>
          <h5 className="text-muted">No doctors found. Try a different search.</h5>
        </div>
      ) : (
        <div className="row g-4">
          {doctors.map((doc) => (
            <div key={doc._id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 border-0 shadow-sm doctor-card text-center p-3">
                <div className="rounded-circle bg-primary bg-opacity-10 mx-auto d-flex align-items-center justify-content-center mb-3"
                  style={{ width: 80, height: 80, fontSize: 40 }}>
                  👨‍⚕️
                </div>
                <h5 className="fw-bold mb-1">{doc.name}</h5>
                <span className="badge bg-primary mb-2">{doc.specialization}</span>
                <p className="text-muted small mb-1">🏥 {doc.hospital || 'Private Clinic'}</p>
                <p className="text-muted small mb-1">⭐ {doc.experience} yrs experience</p>
                <p className="fw-bold text-success mb-3">₹{doc.fee} / consultation</p>
                <button className="btn btn-primary btn-sm w-100"
                  onClick={() => navigate(`/book/${doc._id}`)}>
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorList;