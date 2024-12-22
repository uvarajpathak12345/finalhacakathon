import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [date, setDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doctor, setDoctor] = useState("");
  const [fullName, setFullName] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState([]);

  const doctors = [
    { name: "Dr. Smith", field: "-cardiologist" },
    { name: "Dr. Johnson", field: "-dermatologist" },
    { name: "Dr. Prajesh", field: "-neurologist" },
    { name: "Dr. Lee", field: "-orthopedic surgeon" },
    { name: "Dr. Patel", field: "-pediatrician" },
    { name: "Dr. Garcia", field: "-gynecologist" },
    { name: "Dr. Brown", field: "-oncologist" },
    { name: "Dr. Taylor", field: "-psychiatrist" },
    { name: "Dr. Wilson", field: "-ophthalmologist" },
    { name: "Dr. Nguyen", field: "-endocrinologist" },
    { name: "Dr. Martinez", field: "-pulmonologist" },
    { name: "Dr. Hernandez", field: "-rheumatologist" },
    { name: "Dr. White", field: "-gastroenterologist" },
    { name: "Dr. Clark", field: "-urologist" },
    { name: "Dr. Lewis", field: "-nephrologist" },
  ];

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const newAppointment = {
    name: fullName,
    time: time,
    doctor: doctor,
    number: phoneNumber,
    date: date,
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get");
        const uniqueAppointments = Array.from(
          new Map(
            response.data.map((appointment) => [
              JSON.stringify(appointment),
              appointment,
            ])
          ).values()
        );
        setAppointments(uniqueAppointments.slice(0, 10));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const maxDate = `${today.getFullYear() + 1}-12-31`;

    if (new Date(selectedDate) <= today) {
      setError("You cannot select today or a past date.");
      setDate("");
    } else if (selectedDate > maxDate) {
      setError("You cannot select a date beyond the end of next year.");
      setDate("");
    } else {
      setError("");
      setDate(selectedDate);
    }
  };

  
  const handleDelete = async (indexToRemove,id) => {
    setAppointments(appointments.filter((_, index) => index !== indexToRemove));
    try {
      let response = await axios.delete(`http://localhost:3000/delete/${id}`);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !date || !time || !phoneNumber || !doctor) {
      setError("Please fill in all fields.");
      return;
    }

    const newAppointment = { fullName, date, time, phoneNumber, doctor };
    const isDuplicate = appointments.some(
      (appointment) =>
        appointment.fullName === newAppointment.fullName &&
        appointment.date === newAppointment.date &&
        appointment.time === newAppointment.time &&
        appointment.phoneNumber === newAppointment.phoneNumber &&
        appointment.doctor === newAppointment.doctor
    );

    if (isDuplicate) {
      setError("Duplicate appointment detected. Please modify the details.");
      return;
    }

    try {
      let response = axios.post("http://localhost:3000/create", newAppointment);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }

    setAppointments([...appointments, newAppointment]);

    // Reset form fields
    setFullName("");
    setDate("");
    setTime("");
    setPhoneNumber("");
    setDoctor("");
    setError("");
  };

  return (
    <div className="container mx-auto p-4 mt-9">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md space-y-4 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold text-center">Appointment Form</h2>

        <div className="flex flex-col">
          <label className="text-lg">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Select a Date</label>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="p-2 border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Select Time</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select Time --</option>
            {times.map((timeSlot, index) => (
              <option key={index} value={timeSlot}>
                {timeSlot}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              if(isNaN(e.target.value)){
                alert('text is not a number')
              }else{
                setPhoneNumber(e.target.value)
              }
            }}
            placeholder="Enter phone number"
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Select Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc, index) => (
              <option key={index} value={`${doc.name} ${doc.field}`}>
                {doc.name} {doc.field}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Book Appointment
        </button>
      </form>

      {/* Appointments Table */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-center">Appointments</h3>
        {appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300 mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Full Name</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Time</th>
                  <th className="px-4 py-2 border">Phone Number</th>
                  <th className="px-4 py-2 border">Doctor</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border">{appointment.fullName}</td>
                    <td className="px-4 py-2 border">{appointment.date}</td>
                    <td className="px-4 py-2 border">{appointment.time}</td>
                    <td className="px-4 py-2 border">{appointment.phoneNumber}</td>
                    <td className="px-4 py-2 border">{appointment.doctor}</td>
                    <td className="px-4 py-2 border">
                      <button
                        onClick={() => handleDelete(index,appointment._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center mt-4">No appointments booked yet.</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentForm;
