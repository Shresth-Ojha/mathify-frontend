import { useAuth } from '../store/auth';

const Profile = () => {
    // @ts-ignore
    const { user } = useAuth();

    return <>{!user ? <div>Not logged in</div> : <div> {user.name} - {user.email}</div>}</>;
};

export default Profile;
