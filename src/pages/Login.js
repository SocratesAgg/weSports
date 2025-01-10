import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !pin) {
            setError('Please provide both email and PIN');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pin }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsAuthenticated(true); // Update authentication state
                navigate('/profile'); // Redirect to profile
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error('Login failed:', err);
            setError('Login failed. Please try again later.');
        }
    };

    return (
        <div className="login-container">
            <h2 className="h2">Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
            />
            <button 
                onClick={handleLogin}
                className='email-btn'
                >Login</button>
        </div>
    );
};

export default Login;
