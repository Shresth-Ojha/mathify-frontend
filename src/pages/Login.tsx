import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Login = () => {
    const [loginCred, setLoginCred] = useState<{
        email: string;
        password: string;
    }>({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    //@ts-ignore
    const { setToken, setUser } = useAuth();


    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginCred({
            ...loginCred,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            console.log('logging in...');

            const requestOptions = {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginCred),
                redirect: 'follow' as RequestRedirect,
                credentials: 'include' as RequestCredentials,
            };
            
            const res = await fetch(
                import.meta.env.VITE_BACKEND+'/auth/login',
                requestOptions
            );

            const resp = await res.json();
            console.log(resp);
            if (res.ok) {
                setUser({name: resp.data.name, email: resp.data.email})
                setToken(resp.data.token)
                navigate('/dashboard')
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-login">
                        <div className="container grid grid-two-cols">
                            <div className="login-img">
                                <img
                                    src="/images/login.svg"
                                    alt="login-image"
                                    width={400}
                                    height={500}
                                />
                            </div>
                            <div className="login-form">
                                <h1 className="main-heading mb-3">
                                    Login Form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            // value={'testUser@gmail.com'}
                                            type="text"
                                            id="email"
                                            placeholder="email"
                                            name="email"
                                            required
                                            autoComplete="off"
                                            value={loginCred.email.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="password"
                                            name="password"
                                            required
                                            autoComplete="off"
                                            value={loginCred.password.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-submit"
                                    >
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    );
};

export default Login;
