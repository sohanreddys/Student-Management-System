import axios from './axios';

export const getStudents = () => axios.get('/students');
export const getStudentById = (id) => axios.get(`/students/${id}`);
export const createStudent = (studentData) => axios.post('/students', studentData);
export const updateStudent = (id, studentData) => axios.put(`/students/${id}`, studentData);
export const deleteStudent = (id) => axios.delete(`/students/${id}`);
