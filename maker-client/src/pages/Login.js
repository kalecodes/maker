import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState }
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        // clear form value
        setFormState({
            email: '',
            password: ''
        });
    };

    return (
        <main className="">
            <div className="">
                <div className="">
                    <h4 className="">Login</h4>
                    <div className="">
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className=""
                                placeholder="Your email"
                                name="email"
                                type="email"
                                id="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className=""
                                placeholder="*******"
                                name="password"
                                type="password"
                                id="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button className="" type="submit">
                                Submit
                            </button>
                        </form>

                        {error && <div>Login failed</div>}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;