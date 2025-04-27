import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/students');
  };

  return (
    <div className="home-container">
      <h2>Welcome to CBIT Student Management System</h2>
      <div className="home-actions">
        <button onClick={handleGetStarted}>Get Started</button>
        <a href="https://www.cbit.ac.in/" target="_blank" rel="noopener noreferrer">
          <button>Learn More</button>
        </a>
      </div>
    </div>
  );
};

export default Home;
