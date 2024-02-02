// import './App.css'
import { Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Navigationbar from './components/Navigationbar';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Report from './pages/Report';

const App = () => {
    return (
        <>
            <Navigationbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quiz/:quizId" element={<Quiz/>} />
                <Route path="/report/:quizId?" element={<Report />} />
            </Routes>
        </>
    );
};

export default App;
