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
import { useState } from 'react';
import { QuizType } from './utils/interfaces';

const App = () => {
    const [activeQuiz, setActiveQuiz] = useState<QuizType | null>(null);
    
    return (
        <>
            <Navigationbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Dashboard
                            activeQuiz={activeQuiz}
                            setActiveQuiz={setActiveQuiz}
                        />
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <Dashboard
                            activeQuiz={activeQuiz}
                            setActiveQuiz={setActiveQuiz}
                        />
                    }
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quiz" element={<Quiz activeQuiz={null} />} />
            </Routes>
        </>
    );
};

export default App;
