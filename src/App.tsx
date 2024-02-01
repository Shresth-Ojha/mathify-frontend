// import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import QuizzesDashboard from './pages/QuizzesDashboard';
import Logout from './pages/Logout';
import Profile from './pages/Profile';

const App = () => {
    return (
        <>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<QuizzesDashboard />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
        </>
    );
};

export default App;
