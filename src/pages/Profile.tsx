import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { Container } from 'react-bootstrap';
//@ts-ignore
import { getQuote } from 'inspirational-quotes';

// const Quote = require('inspirational-quotes');

const Profile = () => {
    console.log(getQuote());
    // @ts-ignore
    const { user } = useAuth();

    if (!user) {
        console.log('Not logged in, go to login');
        return <Navigate to="/login" />;
    }

    return (
        <Container className="mt-5 d-flex flex-column flex-grow-1 justify-content-around">
            <div>
                <h1>Name: {user.name}</h1>
                <h1>Email: {user.email}</h1>
            </div>

            <div>
                <h3 className="mb-2">
                    <u>Quote for the time (Refresh to get More) !</u>
                </h3>
                <h4>{getQuote().text}</h4> <h4>- {getQuote().author}</h4>{' '}
            </div>
        </Container>
    );
};

export default Profile;
