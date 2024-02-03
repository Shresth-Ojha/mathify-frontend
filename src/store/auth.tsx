import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
// import { useNavigate } from 'react-router-dom';
import { QuizType, ReportType, UserProfile } from '../utils/interfaces';

const AuthContext = createContext({});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const navigate = useNavigate();
    const [token, setToken] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [quizzes, setQuizzes] = useState<QuizType[]>([]);
    const [currentExam, setCurrentExam] = useState<QuizType | null>(null);
    const [reports, setReports] = useState<ReportType[]>([]);

    const logout = async () => {
        try {
            console.log('logging out -> ', token);
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include' as RequestCredentials,
            };

            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/user/logout',
                requestOptions
            );
            const resp = await res.json();
            console.log(resp);

            if (res.ok) {
                localStorage.removeItem('jwttokenLC')
                setUser(null);
                setToken('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const userAuthentication = async () => {
        // const jwtToken = document.cookie.split('=')[1];
        // console.log(jwtToken);
        // setToken(jwtToken);

        const jwtTokenLC = localStorage.getItem('jwttokenLC') || '';
        setToken(jwtTokenLC)


        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtTokenLC}`,
                },
                credentials: 'include' as RequestCredentials,
            };

            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/user',
                requestOptions
            );
            const resp = await res.json();
            console.log(resp);

            if (res.ok) {
                setUser(resp.data.user);
            }
            setLoading(false);
        } catch (error) {
            console.log('Error while authenticating: ', error);
            alert('Failed to connect..')
        }
    };

    const getQuizzes = async () => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include' as RequestCredentials,
            };

            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/quiz',
                requestOptions
            );
            const resp = await res.json();
            console.log(resp);
            if (res.ok) {
                const quizzes = resp.data;
                setQuizzes(quizzes);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const startExam = async (quizId: string) => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include' as RequestCredentials,
            };

            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/exam/' + quizId,
                requestOptions
            );
            const resp = await res.json();
            console.log(resp);
            if (res.ok) {
                setCurrentExam(resp);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitExam = async (quizId: string, submission: any) => {
        try {
            const reqBody = {
                quizId,
                submissions: submission,
            };
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include' as RequestCredentials,
                body: JSON.stringify(reqBody),
            };

            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/exam',
                requestOptions
            );
            const resp = await res.json();
            console.log(resp);
            if (res.ok) {
                console.log('submiited brother');
                return resp.data.report._id;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getReports = async (reportId: string = '') => {
        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include' as RequestCredentials,
            };
            
            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/report/' + reportId,
                requestOptions
            );
            const resp = await res.json();
            console.log(resp);
            if (res.ok) {
                const detailedReports = resp.data.report;
                var tempReports: ReportType[] = [];

                for (let i = 0; i < detailedReports.length; i++) {
                    const quizName = detailedReports[i].quizName;
                    const score = detailedReports[i].score;
                    const total = detailedReports[i].total;

                    //date conversion to IST
                    const dateObject = new Date(detailedReports[i].createdAt);

                    const attemptedDate = dateObject.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                    });

                    const tempReport: ReportType = {
                        quizName,
                        score,
                        total,
                        attemptedDate,
                    };

                    tempReports.push(tempReport);
                }

                setReports(tempReports);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userAuthentication();
    }, []);

    return (
        //@ts-ignore
        <AuthContext.Provider
            value={{
                setToken,
                logout,
                user,
                setUser,
                quizzes,
                getQuizzes,
                currentExam,
                startExam,
                submitExam,
                reports,
                getReports,
            }}
        >
            <div className="w-100 min-vh-100 d-flex flex-column m-0 p-0">
                {loading ? (
                    <div className="d-flex mx-auto my-auto">
                        <img src="/images/loading.gif" alt="" />
                    </div>
                ) : (
                    children
                )}
            </div>
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
