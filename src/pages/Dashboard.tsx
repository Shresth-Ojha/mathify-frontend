import { useEffect } from 'react';
import { useAuth } from '../store/auth';
import { Quiz } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './dashboard.css'


const Dashboard = () => {

    const navigate = useNavigate();

    //@ts-ignore
    const {quizzes, getQuizzes, user} = useAuth()
    const samplequizzes = [
        {
            name: 'basic math1',
        },
        { name: 'basic math2' },
    ];

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        console.log("getting quizzes")
        getQuizzes();
    }, [])


    return (
        <section className="quizzes-dashboard">
            {
              quizzes.map((q:Quiz) => {
                return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card
                                    title and make up the bulk of the card's
                                    content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                );
              }
              )
            }
        </section>
    );
};

export default Dashboard;
