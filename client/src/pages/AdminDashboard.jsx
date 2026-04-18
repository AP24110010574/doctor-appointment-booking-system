import React, { useEffect, useState } from 'react';
import { getAllUsers, getAllDoctorsAdmin, approveDoctor, deleteUser, getAllAppointments } from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [tab, setTab] = useState('doctors');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const { data: u } = await getAllUsers();
      const { data: d } = await getAllDoctorsAdmin();
      const { data: a } = await getAllAppointments();
      setUsers(u); setDoctors(d); setAppointments(a);
    } catch (error) { console.error(error); }
  };

  const handleApprove = async (id) => {
    try {
      await approveDoctor(id);
      toast.success('Doctor approved!');
      fetchAll();
    } catch (error) { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user permanently?')) return;
    try {
      await deleteUser(id);
      toast.success('User deleted');
      fetchAll();
    } catch (error) { toast.error('Failed'); }
  };

  const pending = doctors.filter(d => !d.isApproved).length;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">⚙️ Admin Dashboard</h2>
      <p className="text-muted mb-4">Manage the entire system</p>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Users', value: users.length, color: 'primary', icon: '👥' },
          { label: 'Total Doctors', value: doctors.length, color: 'info', icon: '👨‍⚕️' },
          { label: 'Appointments', value: appointments.length, color: 'success', icon: '📋' },
          { label: 'Pending Approval', value: pending, color: 'warning', icon: '⏳' },
        ].map((stat) => (
          <div key={stat.label} className="col-6 col-md-3">
            <div className={`card border-0 shadow-sm text-center p-3 bg-${stat.color} bg-opacity-10`}>
              <div style={{ fontSize: 28 }}>{stat.icon}</div>
              <h3 className={`fw-bold text-${stat.color} mb-0`}>{stat.value}</h3>
              <p className="text-muted small mb-0">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {[
          { key: 'doctors', label: '👨‍⚕️ Doctors' },
          { key: 'users', label: '👥 Users' },
          { key: 'appointments', label: '📋 Appointments' },
        ].map((t) => (
          <li key={t.key} className="nav-item">
            <button className={`nav-link ${tab === t.key ? 'active fw-semibold' : ''}`}
              onClick={() => setTab(t.key)}>
              {t.label}
              {t.key === 'doctors' && pending > 0 && (
                <span className="badge bg-warning text-dark ms-2">{pending} pending</span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Doctors Tab */}
      {tab === 'doctors' && doctors.map((doc) => (
        <div key={doc._id} className="card border-0 shadow-sm mb-3">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5 className="fw-bold text-primary mb-1">{doc.name}</h5>
                <p className="text-muted small mb-1">🩺 {doc.specialization} • 🏥 {doc.hospital}</p>
                <p className="text-muted small mb-0">
                  ⭐ {doc.experience} yrs experience • ₹{doc.fee} fee
                </p>
              </div>
              <div className="col-md-3 mt-2 mt-md-0">
                <p className="small mb-1">📧 {doc.email}</p>
              </div>
              <div className="col-md-3 text-md-end mt-2 mt-md-0">
                {doc.isApproved ? (
                  <span className="badge bg-success px-3 py-2">✅ Approved</span>
                ) : (
                  <button className="btn btn-success btn-sm px-4"
                    onClick={() => handleApprove(doc._id)}>
                    Approve Doctor
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Users Tab */}
      {tab === 'users' && users.map((user) => (
        <div key={user._id} className="card border-0 shadow-sm mb-3">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h5 className="fw-bold mb-1">{user.name}</h5>
                <p className="text-muted small mb-0">📧 {user.email}</p>
              </div>
              <div className="col-md-3 mt-2 mt-md-0">
                <span className={`badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'doctor' ? 'bg-primary' : 'bg-secondary'} px-3 py-2`}>
                  {user.role}
                </span>
              </div>
              <div className="col-md-3 text-md-end mt-2 mt-md-0">
                {user.role !== 'admin' && (
                  <button className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Appointments Tab */}
      {tab === 'appointments' && appointments.map((appt) => (
        <div key={appt._id} className="card border-0 shadow-sm mb-3">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-5">
                <p className="fw-semibold mb-1">Patient: {appt.patientId?.name}</p>
                <p className="text-muted small mb-0">Doctor: {appt.doctorId?.name} • {appt.doctorId?.specialization}</p>
              </div>
              <div className="col-md-4 mt-2 mt-md-0">
                <p className="fw-semibold mb-1">📅 {appt.appointmentDate}</p>
                <p className="text-muted small mb-0">🕐 {appt.appointmentTime}</p>
              </div>
              <div className="col-md-3 text-md-end mt-2 mt-md-0">
                <span className={`badge badge-${appt.status.toLowerCase()} px-3 py-2`}>
                  {appt.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;