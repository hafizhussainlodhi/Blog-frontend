import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
export default function UserCount() {
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/api/users/count`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => setUserCount(data.count))
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="bg-slate-800 p-6 rounded-xl border border-emerald-500 mb-6 text-center shadow-lg">
            <h3 className="text-slate-400 text-sm uppercase">Total Users</h3>
            <p className="text-4xl font-bold text-white mt-2">{userCount}</p>
        </div>
    );
}