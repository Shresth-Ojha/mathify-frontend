import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
//@ts-ignore
import { getQuote } from 'inspirational-quotes';

const Profile = () => {
    // @ts-ignore
    const { user } = useAuth();

    if (!user) {
        console.log('Not logged in, go to login');
        return <Navigate to="/login" />;
    }

    const quote: { text: string; author: string } = getQuote();

    return (
        <section style={{ backgroundColor: 'white' }}>
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                    alt="avatar"
                                    className="rounded-circle img-fluid"
                                    style={{ width: '150px' }}
                                />
                                <h5 className="my-3">{user.name}</h5>
                                <p className="text-muted mb-1">Student</p>
                                <p className="text-muted mb-4">
                                    Bal Bharti Public School
                                </p>
                                <div className="d-flex justify-content-center mb-2">
                                    {/* <button
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Follow
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary ms-1"
                                        >
                                            Message
                                        </button> */}
                                </div>
                            </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i className="fas fa-globe fa-lg text-warning"></i>
                                        <p className="mb-0">Maths ★★★☆☆</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i
                                            className="fab fa-github fa-lg"
                                            style={{ color: '#333333' }}
                                        ></i>
                                        <p className="mb-0">Science ★★★☆☆</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i
                                            className="fab fa-twitter fa-lg"
                                            style={{ color: '#55acee' }}
                                        ></i>
                                        <p className="mb-0">Hindi ★★★☆☆</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i
                                            className="fab fa-instagram fa-lg"
                                            style={{ color: '#ac2bac' }}
                                        ></i>
                                        <p className="mb-0">English ★★★☆☆</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-start align-items-center p-3">
                                        <i
                                            className="fab fa-facebook-f fa-lg"
                                            style={{ color: '#3b5998' }}
                                        ></i>
                                        <p className="mb-0">Coding ★★★★★★★★★</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Full Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {user.name}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            +91 99999 11111
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Mobile</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            +91 11111 99999
                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">
                                            Mars Planet
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-4 mb-md-0">
                                    <div className="card-body">
                                        <p className="mb-4">
                                            <span className="text-primary font-italic me-1">
                                                Quizzes
                                            </span>{' '}
                                            Completion Status
                                        </p>
                                        <p
                                            className="mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Coding
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '80%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Maths
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '72%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Hindi
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '89%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Science
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '55%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            English
                                        </p>
                                        <div
                                            className="progress rounded mb-2"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '66%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card mb-4 mb-md-0">
                                    <div className="card-body">
                                        <p className="mb-4">
                                            <span className="text-primary font-italic me-1">
                                                Quote of the day
                                            </span>{' '}
                                            Refresh to get more!
                                        </p>
                                        {/* <p
                                            className="mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Web Design
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '80%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Website Markup
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '72%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            One Page
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '89%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Mobile Template
                                        </p>
                                        <div
                                            className="progress rounded"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '55%' }}
                                            ></div>
                                        </div>
                                        <p
                                            className="mt-4 mb-1"
                                            style={{ fontSize: '.77rem' }}
                                        >
                                            Backend API
                                        </p>
                                        <div
                                            className="progress rounded mb-2"
                                            style={{ height: '5px' }}
                                        >
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{ width: '66%' }}
                                            ></div>
                                        </div> */}

                                        <p>{quote.text}</p>
                                        <p>- {quote.author}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // </Container>
    );
};

export default Profile;
