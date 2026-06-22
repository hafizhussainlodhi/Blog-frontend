import React, { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                alert("Login Successful!");
                window.location.href = '/';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f4f7' // Aapka background color
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '25px', color: '#333', fontSize: '24px' }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '15px', color: "black", borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ display: 'block', width: '100%', color: "black", padding: '12px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
                    />
                    <button type="submit" style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background 0.3s'
                    }}>
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;