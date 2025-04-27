import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <img src="https://www.cbit.ac.in/wp-content/uploads/2023/09/CBIT-LOGO.png" alt="Logo" style={{ cursor: 'pointer', height: '50px' }} />
      </Link>
      <div>
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/add-student">Add Student</Link>
      </div>
    </nav>
  );
};

export default Navbar;
