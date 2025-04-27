import React, { useEffect, useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent, getStudentById } from '../api/studentApi';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // for sorting roll number

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
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

  const filteredStudents = students.filter(student => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (student.studentId && student.studentId.toLowerCase().includes(searchLower)) ||
      (student.firstName && student.firstName.toLowerCase().includes(searchLower)) ||
      (student.lastName && student.lastName.toLowerCase().includes(searchLower)) ||
      (student.department && student.department.toLowerCase().includes(searchLower)) ||
      (student.enrollmentYear && student.enrollmentYear.toString().includes(searchLower)) ||
      (student.email && student.email.toLowerCase().includes(searchLower))  // ✅ Added email check
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
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />

      <button onClick={handleSort} style={{ marginBottom: '20px' }}>
        Sort by Roll No ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
