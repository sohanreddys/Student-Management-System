import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent, getStudentById } from '../api/studentApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
        toast.error('Failed to load students.');
      }
    };
    fetchStudents();
  }, []);

  const handleSort = () => {
    const sorted = [...students].sort((a, b) => {
      const rollA = a.studentId ? a.studentId.toLowerCase() : '';
      const rollB = b.studentId ? b.studentId.toLowerCase() : '';
      if (sortOrder === 'asc') {
        return rollA.localeCompare(rollB);
      } else {
        return rollB.localeCompare(rollA);
      }
    });
    setStudents(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleEdit = (id) => {
    navigate(`/edit-student/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully.');
        setStudents(students.filter(student => student._id !== id));
      } catch (error) {
        console.error('Failed to delete student', error);
        toast.error('Failed to delete student.');
      }
    }
  };

  const filteredStudents = students.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (student.studentId && student.studentId.toLowerCase().includes(searchLower)) ||
      (student.firstName && student.firstName.toLowerCase().includes(searchLower)) ||
      (student.lastName && student.lastName.toLowerCase().includes(searchLower)) ||
      (student.department && student.department.toLowerCase().includes(searchLower)) ||
      (student.enrollmentYear && student.enrollmentYear.toString().includes(searchLower)) ||
      (student.email && student.email.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="container">
      <h2>Student List</h2>

      <input
        type="text"
        placeholder="Search by Roll No, Name, Department, Year..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button onClick={handleSort} style={{ marginBottom: '20px' }}>
        Sort by Roll No ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Roll No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Department</th>
              <th>Enrollment Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.dob ? new Date(student.dob).toLocaleDateString() : '-'}</td>
                <td>{student.department}</td>
                <td>{student.enrollmentYear}</td>
                <td>{student.isActive ? 'Active' : 'Inactive'}</td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => handleEdit(student._id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
