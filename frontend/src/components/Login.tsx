import React, { useState } from 'react';
import Header from './Header';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(process.env.REACT_APP_API_URL + '/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            localStorage.setItem('token', data.data.token);
            alert('Login successful');
        } catch (error) {
            const err = error as Error;
            alert('Login failed ' + err.message);
        }
    };

    return (
        <div className="w-full">
            <Header />

            <div className="container max-w-2xl mx-auto p-4 w-full">
                <form onSubmit={handleLogin}>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="w-full" htmlFor="email">Email</label>
                            <input
                                className="border border-gray-300 p-2 rounded w-full"
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                type="email"
                                value={email}
                            />
                        </div>
                        <div>
                            <label className="w-full" htmlFor="password">Password</label>
                            <input
                                className="border border-gray-300 p-2 rounded w-full"
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <div className="flex items-center justify-end">
                            <button 
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                type="submit"
                            >Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;