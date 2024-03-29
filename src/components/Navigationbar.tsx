import { Navbar, Container, Nav } from 'react-bootstrap';

import './Navigationbar.css';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

const Navigationbar = () => {
    //@ts-ignore
    const { user, reports } = useAuth();
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/dashboard">
                        Mathify
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/dashboard">
                                {' '}
                                Dashboard
                            </Nav.Link>
                            {user ? (
                                <>
                                    {reports.length > 1 ? (
                                        <Nav.Link as={Link} to="/report">
                                            Reports
                                        </Nav.Link>
                                    ) : (
                                        <Nav.Link href="/report">
                                            Reports
                                        </Nav.Link>
                                    )}
                                    <Nav.Link as={Link} to="/profile">
                                        Profile
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/logout">
                                        Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to="/register">
                                        Register
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigationbar;
