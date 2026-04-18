import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDoctorById, bookAppointment } from '../services/api';
import { toast } from 'react-toastify';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getDoctorById(id);
      setDoctor(data);
    };
    fetch();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookAppointment({ doctorId: id, appointmentDate: date, appointmentTime: time, reason });
      toast.success('Appointment booked successfully!');
      navigate('/dashboard/patient');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
    setLoading(false);
  };

  if (!doctor) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary"></div>
    </div>
  );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          {/* Doctor Info Card */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-primary bg-opacity-10 mx-auto d-flex align-items-center justify-content-center mb-3"
                style={{ width: 90, height: 90, fontSize: 48 }}>
                👨‍⚕️
              </div>
              <h4 className="fw-bold">{doctor.name}</h4>
              <span className="badge bg-primary mb-2">{doctor.specialization}</span>
              <p className="text-muted mb-1">🏥 {doctor.hospital}</p>
              <p className="text-muted mb-1">⭐ {doctor.experience} years experience</p>
              <h5 className="text-success fw-bold mt-2">₹{doctor.fee} per consultation</h5>
            </div>
          </div>

          {/* Booking Form */}
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-4">📅 Book Your Appointment</h5>
              <form onSubmit={handleBooking}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Date</label>
                  <input type="date" className="form-control" value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} required />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select Time Slot</label>
                  <select className="form-select" value={time}
                    onChange={(e) => setTime(e.target.value)} required>
                    <option value="">-- Choose an available slot --</option>
                    {doctor.availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Reason for Visit</label>
                  <textarea className="form-control" value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly describe your symptoms or reason..." rows={3} />
                </div>
                <div className="d-flex gap-3">
                  <button type="button" className="btn btn-outline-secondary flex-fill"
                    onClick={() => navigate('/doctors')}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn-primary flex-fill fw-semibold"
                    disabled={loading}>
                    {loading ? 'Booking...' : '✅ Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookAppointment;