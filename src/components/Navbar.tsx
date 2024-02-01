import { NavLink } from 'react-router-dom';
import './Navbar.css'
import { useAuth } from '../store/auth';

const Navbar = () => {
    //@ts-ignore
    const {user} = useAuth();
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <NavLink to="/">Mathify</NavLink>
                    </div>

                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            {user ? (
                                <>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/logout">Logout</NavLink>
                                </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/login">Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register">
                                            Register
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
