import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudentList from './pages/StudentList';
import AddEditStudent from './pages/AddEditStudent';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main> {/* 🛠️ Main content area */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/add-student" element={<AddEditStudent />} />
          <Route path="/edit-student/:id" element={<AddEditStudent />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
