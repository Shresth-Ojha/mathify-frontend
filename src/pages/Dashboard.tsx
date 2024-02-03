import { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { QuizType } from '../utils/interfaces';
import { Navigate, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, ListGroup } from 'react-bootstrap';

const Dashboard = () => {
    //@ts-ignore
    const { quizzes, getQuizzes, user } = useAuth();
    
    if(!user){
        console.log("Not logged in, go to login")
        return <Navigate to='/login' />
    }

    const navigate = useNavigate();

    // const samplequizzes = [{ name: 'basic math2' }];

    useEffect(() => {
        console.log('Fetching quizzes..');
        getQuizzes();
    }, []);

    const startAttempt = (q: QuizType) => {
        if (!q.is_published) {
            alert('Not published yet!');
        } else {
            // alert("starting")
            navigate('/quiz/' + q._id);
            return
        }
    };

    return (
        <Container className="mt-5 d-flex flex-column align-items-center">
            <h1>Quizzes</h1>
            <Container className="mt-3 mb-5 d-flex flex-wrap justify-content-center align-items-start">
                {quizzes.map((q: QuizType, index: number) => {
                    return (
                        <Card
                            className="m-3"
                            style={{ width: '300px', height: 'auto' }}
                            key={index}
                        >
                            <Card.Body>
                                <Card.Title>{q.name}</Card.Title>
                                <Card.Subtitle className="mb-4 text-muted">
                                    {q.is_published
                                        ? 'Published!'
                                        : 'Not Published'}
                                </Card.Subtitle>
                                <Card.Text>
                                    Ace <b> {q.name} </b>quiz!
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    Created By: {q.author}
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Button
                                    variant="primary"
                                    onClick={() => startAttempt(q)}
                                >
                                    Attempt
                                </Button>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Container>
            {!quizzes.length ? <>No quizzes yet..</> : <></>}
        </Container>
    );
};

export default Dashboard;
