import { ChangeEvent, useState } from 'react';
import { User } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';


const Register = () => {
    const [userRegister, setUserRegister] = useState<User>({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserRegister({
            ...userRegister,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userRegister);

        try {
            const requestOptions = {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegister),
            };
            console.log("sending...")
            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/auth',
                requestOptions
            );
            console.log(res)

            if(res.ok){
                const resp = await res.json();
                alert('Please login now')
                navigate('/login')
                console.log(resp);
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Container className="d-flex min-vh-100 justify-content-center align-items-center">
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <h1 className="main-heading mb-3">Registration Form</h1>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail" //!email to name
                            >
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={userRegister.name.toString()}
                                    name="name"
                                    required
                                    autoComplete="off"
                                    onChange={handleInput}
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="text" //!change to email
                                    placeholder="Enter email"
                                    value={userRegister.email.toString()}
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
                                    value={userRegister.password.toString()}
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
            <section>
                <main>
                    <div className="section-reg">
                        <div className="container grid grid-two-cols">
                            <div className="reg-img">
                                <img
                                    src="/images/reg2.svg"
                                    alt="register-image"
                                    width={400}
                                    height={500}
                                />
                            </div>
                            <div className="reg-form">
                                <h1 className="main-heading mb-3">
                                    Registration Form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">Name</label>{' '}
                                        <br />
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="name"
                                            name="name"
                                            required
                                            autoComplete="off"
                                            value={userRegister.name.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <br />
                                        <input
                                            type="text"
                                            id="email"
                                            placeholder="email"
                                            name="email"
                                            required
                                            autoComplete="off"
                                            value={userRegister.email.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <br />
                                        <input
                                            // value={'testUser'}
                                            type="password"
                                            id="password"
                                            placeholder="password"
                                            name="password"
                                            required
                                            autoComplete="off"
                                            value={userRegister.password.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-submit"
                                    >
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Register;
