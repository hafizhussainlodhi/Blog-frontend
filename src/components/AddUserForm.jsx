import { useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
export default function AddUserForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Adding user...');

        try {
            const res = await fetch(`${API_URL}/api/users`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("User created successfully!");
                setEmail(''); 
                setPassword('');
            } else {
                setMessage(data.message || "Error creating user");
            }
        } catch (error) {
            setMessage("Server error, please try again.");
        }
    };

    return (
        <div className="max-w-md">
            <form onSubmit={handleSubmit} className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg">
                <div className="mb-4">
                    <label className="block text-slate-400 text-sm mb-2">Editor Email</label>
                    <input 
                        className="w-full p-3 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:border-emerald-500 outline-none"
                        type="email" 
                        placeholder="admin@soledad.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-slate-400 text-sm mb-2">Password</label>
                    <input 
                        className="w-full p-3 bg-[#0f172a] border border-slate-600 rounded-lg text-white focus:border-emerald-500 outline-none"
                        type="password" 
                        placeholder="********" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <button 
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all" 
                    type="submit"
                >
                    Create Editor
                </button>
                
                {message && (
                    <p className={`mt-4 text-center text-sm ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}