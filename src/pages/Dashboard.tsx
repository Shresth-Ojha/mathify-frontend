import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { QuizType } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Container, ListGroup } from 'react-bootstrap';
import Quiz from './Quiz';

const Dashboard = ({
    activeQuiz,
    setActiveQuiz
}: {
    activeQuiz: QuizType | null,
    setActiveQuiz: React.Dispatch<React.SetStateAction<QuizType | null>>;
}) => {
    const navigate = useNavigate();

    //@ts-ignore
    const { quizzes, getQuizzes, user } = useAuth();
    const samplequizzes = [{ name: 'basic math2' }];

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        console.log('getting quizzes');
        getQuizzes();
    }, []);

    const startAttempt = (q: QuizType) => {
        if (!q.is_published) {
            alert('Not published yet!');
        } else {
            setActiveQuiz(q);
        }
    };

    return (
        <>
            {!!activeQuiz ? (
                <Quiz activeQuiz={activeQuiz} />
            ) : (
                <Container className="mt-5 d-flex flex-column align-items-center">
                    <h1>Quizzes</h1>
                    <Container className="mt-2 mb-5 d-flex flex-wrap justify-content-center align-items-start">
                        {quizzes.map((q: QuizType) => {
                            return (
                                <Card
                                    className="m-3"
                                    style={{ width: '300px', height: 'auto' }}
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
            )}
        </>
    );
};

export default Dashboard;
