import { ChangeEvent, useState } from 'react';
import { User } from '../utils/interfaces';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);

        try {
            const requestOptions = {
                method: 'POST',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }
            console.log("sending...")
            const res = await fetch(
                import.meta.env.VITE_BACKEND + '/auth',
                requestOptions
            );
            console.log(res)

            if(res.ok){
                const resp = await res.json();
                alert('Please login now')
                navigate('/login')
                console.log(resp);
            }
            
        } catch (error) {
            console.log(error)
        }
        // const newUser = {
        //     name: user.name,
        //     email: user.email,
        //     password: user.password,
        // };
        // console.log('sending');
        // // console.log(JSON.stringify(newUser));

        // const requestOptions:any = {
        //     method: 'POST',
        //     redirect: 'follow' as RequestRedirect,
        //     body: newUser,
        // };
        // fetch(`https://heroku-quizapp-backend.onrender.com/auth`, requestOptions)
        //     .then((res) => res.json())
        //     .then((res) => console.log(res));
    };

    return (
        <>
            <section>
                <main>
                    <div className="section-reg">
                        <div className="container grid grid-two-cols">
                            <div className="reg-img">
                                <img
                                    src="/images/reg2.svg"
                                    alt="register-image"
                                    width={400}
                                    height={500}
                                />
                            </div>
                            <div className="reg-form">
                                <h1 className="main-heading mb-3">
                                    Registration Form
                                </h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name">Name</label>{' '}
                                        <br />
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="name"
                                            name="name"
                                            required
                                            autoComplete="off"
                                            value={user.name.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <br />
                                        <input
                                            // value={'testUser@gmail.com'}
                                            type="text"
                                            id="email"
                                            placeholder="email"
                                            name="email"
                                            required
                                            autoComplete="off"
                                            value={user.email.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <br />
                                        <input
                                            // value={'testUser'}
                                            type="password"
                                            id="password"
                                            placeholder="password"
                                            name="password"
                                            required
                                            autoComplete="off"
                                            value={user.password.toString()}
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <br />
                                    <button
                                        type="submit"
                                        className="btn btn-submit"
                                    >
                                        Register
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

export default Register;
