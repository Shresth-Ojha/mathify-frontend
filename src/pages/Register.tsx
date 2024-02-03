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

        try {
            const requestOptions = {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userRegister),
            };
            console.log("Sending...")
            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/auth',
                requestOptions
            );

            //@ts-ignore
            const resp = await res.json();
            // console.log(resp)



            if(res.ok){
                alert('Please login now')
                navigate('/login')
            } else {
                alert('Something went wrong or email already exists!')
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: '95vh' }}
            >
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <h1 className="main-heading mb-3">
                                Registration Form
                            </h1>
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
                                    type="email" //!change to email
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
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Register;
