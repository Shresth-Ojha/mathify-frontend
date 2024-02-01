import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

const Login = () => {
    const [loginCred, setLoginCred] = useState<{
        email: string;
        password: string;
    }>({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    //@ts-ignore
    const { setToken, setUser } = useAuth();


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginCred({
            ...loginCred,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log('logging in...');

            const requestOptions = {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginCred),
                redirect: 'follow' as RequestRedirect,
                credentials: 'include' as RequestCredentials,
            };
            
            const res = await fetch(
                import.meta.env.VITE_BACKEND+'/auth/login',
                requestOptions
            );

            const resp = await res.json();
            console.log(resp);
            if (res.ok) {
                setUser({name: resp.data.name, email: resp.data.email})
                setToken(resp.data.token)
                navigate('/dashboard')
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Container className="d-flex min-vh-100 justify-content-center align-items-center">
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <h1 className="main-heading mb-3">Login Form</h1>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    value={loginCred.email.toString()}
                                    name="email"
                                    required
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    value={loginCred.password.toString()}
                                    name="password"
                                    required
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            {/* <section>
                <main>
                    <div className="section-login">
                        <div className="container grid grid-two-cols">
                            <div className="login-img">
                                <img
                                    src="/images/login.svg"
                                    alt="login-image"
                                    width={400}
                                    height={500}
                                />
                            </div>
                            <div className="login-form">
                                <h1 className="main-heading mb-3">
                                    Login Form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            // value={'testUser@gmail.com'}
                                            type="text"
                                            id="email"
                                            placeholder="email"
                                            name="email"
                                            required
                                            autoComplete="off"
                                            value={loginCred.email.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="password"
                                            name="password"
                                            required
                                            autoComplete="off"
                                            value={loginCred.password.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-submit"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section> */}
        </>
    );
};

export default Login;
