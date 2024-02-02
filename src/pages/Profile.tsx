import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Profile = () => {
    // @ts-ignore
    const { user } = useAuth();

    if (!user) {
        console.log('Not logged in, go to login');
        return <Navigate to="/login" />;
    }

    return (
        <div>
            {' '}
            {user.name} - {user.email}
        </div>
    );
};

export default Profile;
