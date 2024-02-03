import {  Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useEffect } from 'react';
import { ReportType } from '../utils/interfaces';
import { Card, ListGroup, Container, Button } from 'react-bootstrap';

const Report = () => {
    //@ts-ignore
    const { user, reports, getReports } = useAuth();
    if (!user) {
        console.log('Not logged in, go to login');
        return <Navigate to="/login" />;
    }

    // const navigate = useNavigate();

    const { reportId } = useParams();

    useEffect(() => {
        console.log('Fetching reports...');
        getReports(reportId);
    }, []);

    return (
        <Container className="mt-5 d-flex flex-column align-items-center">
            <h1>{reportId ? 'Report' : 'Reports'}</h1>
            <Container className="mt-3 mb-5 d-flex flex-wrap justify-content-center align-items-start">
                {reports.map((r: ReportType, index: number) => {
                    return (
                        <Card
                            className="m-3 bg-warning"
                            style={{ width: '300px', height: 'auto' }}
                            key={index}
                        >
                            <Card.Body className="p-2">
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item className="bg-warning">
                                        <b>Quiz Name:</b> {r.quizName}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Your Score:</b> {r.score}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Max Marks:</b> {r.total}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <b>Attemped On:</b> <br />
                                        {r.attemptedDate}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    );
                })}
            </Container>
            {!reports.length ? <>No reports yet..</> : <></>}

            <Button
                href="/report"
                onClick={() => {
                    // return navigate('/report')
                }}
            >
                View all reports
            </Button>
        </Container>
    );
};

export default Report;
