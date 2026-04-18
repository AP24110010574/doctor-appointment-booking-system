import React, { useEffect, useState } from 'react';
import { getMyAppointments, cancelAppointment, getMyNotifications } from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [tab, setTab] = useState('appointments');
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      const { data } = await getMyAppointments();
      setAppointments(data);
      const { data: notifs } = await getMyNotifications();
      setNotifications(notifs);
    } catch (error) { console.error(error); }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      await cancelAppointment(id);
      toast.success('Appointment cancelled');
      fetchData();
    } catch (error) { toast.error('Failed to cancel'); }
  };

  const booked = appointments.filter(a => a.status === 'Booked').length;
  const completed = appointments.filter(a => a.status === 'Completed').length;
  const unread = notifications.filter(n => n.status === 'Unread').length;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">👋 Welcome, {userInfo?.name}</h2>
      <p className="text-muted mb-4">Manage your appointments and notifications</p>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Appointments', value: appointments.length, color: 'primary', icon: '📋' },
          { label: 'Upcoming', value: booked, color: 'warning', icon: '⏳' },
          { label: 'Completed', value: completed, color: 'success', icon: '✅' },
          { label: 'Notifications', value: unread, color: 'danger', icon: '🔔' },
        ].map((stat) => (
          <div key={stat.label} className="col-6 col-md-3">
            <div className={`card border-0 shadow-sm text-center p-3 stat-card bg-${stat.color} bg-opacity-10`}>
              <div style={{ fontSize: 28 }}>{stat.icon}</div>
              <h3 className={`fw-bold text-${stat.color} mb-0`}>{stat.value}</h3>
              <p className="text-muted small mb-0">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${tab === 'appointments' ? 'active fw-semibold' : ''}`}
            onClick={() => setTab('appointments')}>
            📋 My Appointments
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === 'notifications' ? 'active fw-semibold' : ''}`}
            onClick={() => setTab('notifications')}>
            🔔 Notifications
            {unread > 0 && <span className="badge bg-danger ms-2">{unread}</span>}
          </button>
        </li>
      </ul>

      {/* Appointments Tab */}
      {tab === 'appointments' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Your Appointments</h5>
            <Link to="/doctors" className="btn btn-primary btn-sm">+ Book New</Link>
          </div>
          {appointments.length === 0 ? (
            <div className="text-center py-5 card border-0 shadow-sm">
              <div style={{ fontSize: 64 }}>📅</div>
              <h5 className="text-muted">No appointments yet</h5>
              <Link to="/doctors" className="btn btn-primary mt-3 px-4">Book Your First Appointment</Link>
            </div>
          ) : (
            appointments.map((appt) => (
              <div key={appt._id} className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <h5 className="fw-bold text-primary mb-1">{appt.doctorId?.name}</h5>
                      <p className="text-muted mb-1 small">{appt.doctorId?.specialization}</p>
                      <p className="text-muted mb-1 small">🏥 {appt.doctorId?.hospital}</p>
                      {appt.reason && <p className="small mb-0">💬 {appt.reason}</p>}
                    </div>
                    <div className="col-md-3 text-md-center mt-2 mt-md-0">
                      <p className="fw-semibold mb-1">📅 {appt.appointmentDate}</p>
                      <p className="text-muted small mb-1">🕐 {appt.appointmentTime}</p>
                      <span className={`badge badge-${appt.status.toLowerCase()} px-3 py-2`}>
                        {appt.status}
                      </span>
                    </div>
                    <div className="col-md-3 text-md-end mt-2 mt-md-0">
                      {appt.status === 'Booked' && (
                        <button className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancel(appt._id)}>
                          Cancel
                        </button>
                      )}
                      {appt.doctorNotes && (
                        <div className="mt-2 p-2 rounded bg-success bg-opacity-10 text-start">
                          <p className="small text-success mb-0">📝 {appt.doctorNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* Notifications Tab */}
      {tab === 'notifications' && (
        <>
          <h5 className="fw-bold mb-3">Your Notifications</h5>
          {notifications.length === 0 ? (
            <div className="text-center py-5 card border-0 shadow-sm">
              <div style={{ fontSize: 64 }}>🔔</div>
              <h5 className="text-muted">No notifications yet</h5>
            </div>
          ) : (
            notifications.map((notif) => (
              <div key={notif._id} className={`card border-0 shadow-sm mb-3 ${notif.status === 'Unread' ? 'border-start border-primary border-4' : ''}`}>
                <div className="card-body d-flex justify-content-between align-items-start">
                  <div>
                    <p className="mb-1">{notif.message}</p>
                    <p className="text-muted small mb-0">
                      🕐 {new Date(notif.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {notif.status === 'Unread' && (
                    <span className="badge bg-primary ms-2">New</span>
                  )}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default PatientDashboard;