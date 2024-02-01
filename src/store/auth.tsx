import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Quiz, UserProfile } from '../utils/interfaces';

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string>('');
    
    const [user, setUser] = useState<UserProfile | null> (null);
    const [quizzes, setQuizzes] = useState<Quiz[]> ([]);

    const logout = async () => {
        try {
            console.log("logging out -> ", token)
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include' as RequestCredentials,
            };
            
            const res = await fetch(import.meta.env.VITE_BACKEND + '/user/logout', requestOptions)
            const resp = await res.json()
            console.log(resp)
    
            if(res.ok){
                setUser(null)
                setToken('');
            }
            
        } catch (error) {
            console.log(error)
        }
    };

    const userAuthentication = async () => {
        const jwtToken = document.cookie.split('=')[1];
        console.log(jwtToken)
        setToken(jwtToken)

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                credentials: 'include' as RequestCredentials,
            };

            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/user',
                requestOptions
            );
            const resp = await res.json();
            console.log(resp);

            if(res.ok){
                setUser(resp.data.user)
                navigate(window.location.pathname)
            }

        } catch (error) {
            console.log(error);
        }
    };


    const getQuizzes = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include' as RequestCredentials
            }

            const res = await fetch(import.meta.env.VITE_BACKEND + '/quiz', requestOptions);
            const resp = await res.json();
            console.log(resp)
            if(res.ok){
                const quizzes = resp.data
                setQuizzes(quizzes);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        userAuthentication();
    }, []);

    return (
        //@ts-ignore
        <AuthContext.Provider
            value={{ setToken, logout, user, setUser, quizzes, getQuizzes }}
        >
            {children}
        </AuthContext.Provider>
    );
};

//*consumer -> just checks if the useContext for AuthContext was called inside the AuthContext.Provider
const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error('useAuth used outside of the provider');
    }
    return authContextValue;
};

export { AuthProvider, useAuth };
