import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';

const AddEditStudent = () => {
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await API.get(`/students/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.error('Fetch student error:', err);
      toast.error('Failed to fetch student details.');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      studentId, firstName, lastName, email, dob, department, enrollmentYear
    } = student;

    if (!studentId || !firstName || !lastName || !email || !dob || !department || !enrollmentYear) {
      toast.error('Please fill in all required fields!');
      return;
    }

    try {
      if (id) {
        await API.put(`/students/${id}`, student);
        toast.success('Student updated successfully!');
      } else {
        await API.post('/students', student);
        toast.success('Student added successfully!');
      }
      navigate('/students');
    } catch (err) {
      console.error('Save student error:', err);
      toast.error('Error saving student.');
    }
  };

  return (
    <div className="container">
      <h2>{id ? '✏️ Edit Student' : 'Add Student'}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={student.studentId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={student.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={student.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={student.dob ? student.dob.split('T')[0] : ''}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={student.department}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="enrollmentYear"
          placeholder="Enrollment Year"
          value={student.enrollmentYear}
          onChange={handleChange}
          required
        />

        <label style={{ marginTop: '10px', display: 'block' }}>
          <input
            type="checkbox"
            name="isActive"
            checked={student.isActive}
            onChange={handleChange}
          />{' '}
          Active
        </label>

        <button type="submit" style={{ marginTop: '20px' }}>
          {id ? 'Update Student' : 'Add Student'}
        </button>
      </form>
    </div>
  );
};

export default AddEditStudent;
