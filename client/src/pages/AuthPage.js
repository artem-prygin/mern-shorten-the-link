import React, { useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
    const authContext = useContext(AuthContext);
    const { loading, request, error, clearError } = useHttp();
    const message = useMessage();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
        } catch (e) {

        }
    };

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            authContext.login(data.token, data.userId);
        } catch (e) {

        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten the link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Email"
                                       onChange={changeHandler}
                                       name="email"
                                       id="email"
                                       value={form.email}
                                       type="text"/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Password"
                                       onChange={changeHandler}
                                       name="password"
                                       id="password"
                                       value={form.password}
                                       type="password"/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4 mr-10"
                                onClick={loginHandler}
                                disabled={loading}>Login
                        </button>
                        <button className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}>Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
