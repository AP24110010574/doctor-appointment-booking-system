import React, { useEffect, useState } from 'react';
import { getDoctorAppointments, updateAppointmentStatus } from '../services/api';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState({});
  const [tab, setTab] = useState('all');
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await getDoctorAppointments();
      setAppointments(data);
    } catch (error) { console.error(error); }
  };

  const handleComplete = async (id) => {
    try {
      await updateAppointmentStatus(id, { status: 'Completed', doctorNotes: notes[id] || '' });
      toast.success('Marked as completed!');
      fetchAppointments();
    } catch (error) { toast.error('Failed to update'); }
  };

  const filtered = tab === 'all' ? appointments
    : appointments.filter(a => a.status === tab);

  const booked = appointments.filter(a => a.status === 'Booked').length;
  const completed = appointments.filter(a => a.status === 'Completed').length;

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-1">👨‍⚕️ Doctor Dashboard</h2>
      <p className="text-muted mb-4">Welcome, Dr. {userInfo?.name}</p>

      {/* Stats */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Appointments', value: appointments.length, color: 'primary', icon: '📋' },
          { label: 'Upcoming', value: booked, color: 'warning', icon: '⏳' },
          { label: 'Completed', value: completed, color: 'success', icon: '✅' },
        ].map((stat) => (
          <div key={stat.label} className="col-md-4">
            <div className={`card border-0 shadow-sm text-center p-3 bg-${stat.color} bg-opacity-10`}>
              <div style={{ fontSize: 28 }}>{stat.icon}</div>
              <h3 className={`fw-bold text-${stat.color} mb-0`}>{stat.value}</h3>
              <p className="text-muted small mb-0">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <ul className="nav nav-tabs mb-4">
        {['all', 'Booked', 'Completed'].map((t) => (
          <li key={t} className="nav-item">
            <button className={`nav-link ${tab === t ? 'active fw-semibold' : ''}`}
              onClick={() => setTab(t)}>
              {t === 'all' ? '📋 All' : t === 'Booked' ? '⏳ Upcoming' : '✅ Completed'}
            </button>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <div className="text-center py-5 card border-0 shadow-sm">
          <div style={{ fontSize: 64 }}>📅</div>
          <h5 className="text-muted">No appointments found</h5>
        </div>
      ) : (
        filtered.map((appt) => (
          <div key={appt._id} className="card border-0 shadow-sm mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <h5 className="fw-bold text-primary mb-1">{appt.patientId?.name}</h5>
                  <p className="text-muted small mb-1">📧 {appt.patientId?.email}</p>
                  <p className="text-muted small mb-1">📞 {appt.patientId?.phone || 'N/A'}</p>
                  {appt.reason && (
                    <p className="small mb-0 mt-1">
                      <span className="fw-semibold">Reason:</span> {appt.reason}
                    </p>
                  )}
                </div>
                <div className="col-md-4 mt-2 mt-md-0">
                  <p className="fw-semibold mb-1">📅 {appt.appointmentDate}</p>
                  <p className="text-muted mb-1">🕐 {appt.appointmentTime}</p>
                  <span className={`badge badge-${appt.status.toLowerCase()} px-3 py-2`}>
                    {appt.status}
                  </span>
                </div>
                <div className="col-md-3 mt-2 mt-md-0 text-md-end">
                  {appt.status === 'Completed' && appt.doctorNotes && (
                    <div className="p-2 rounded bg-success bg-opacity-10 text-start">
                      <p className="small text-success mb-0">📝 {appt.doctorNotes}</p>
                    </div>
                  )}
                </div>
              </div>

              {appt.status === 'Booked' && (
                <div className="mt-3 pt-3 border-top">
                  <label className="form-label fw-semibold small">Add Consultation Notes</label>
                  <textarea className="form-control form-control-sm mb-2" rows={2}
                    placeholder="Diagnosis, prescription, advice..."
                    value={notes[appt._id] || ''}
                    onChange={(e) => setNotes({ ...notes, [appt._id]: e.target.value })} />
                  <button className="btn btn-success btn-sm px-4"
                    onClick={() => handleComplete(appt._id)}>
                    ✅ Mark as Completed
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorDashboard;