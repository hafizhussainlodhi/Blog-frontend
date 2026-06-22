// import { useEffect, useState } from 'react';
// const API_URL = import.meta.env.VITE_API_URL;
// export default function DashboardStats({ onCategoryClick }) {
//     const [stats, setStats] = useState([]);
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//         fetch(`${API_URL}/api/blogs`)
//             .then(res => res.json())
//             .then(data => setTotal(data.length))
//             .catch(err => console.log(err));

//         fetch(`${API_URL}/api/stats`)
//             .then(res => res.json())
//             .then(data => setStats(data))
//             .catch(err => console.log(err));
//     }, []);

//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             <div className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 cursor-pointer" onClick={() => onCategoryClick('All')}>
//                 <h3 className="text-slate-400 text-sm">Total Blogs</h3>
//                 <p className="text-3xl font-bold text-white mt-2">{total}</p>
//             </div>
//             {stats.map((s) => (
//                 <div key={s._id} onClick={() => onCategoryClick(s._id)} className="bg-[#0f172a] p-6 rounded-xl border border-slate-700 cursor-pointer">
//                     <h3 className="text-slate-400 text-sm">{s._id}</h3>
//                     <p className="text-3xl font-bold text-white mt-2">{s.count} Posts</p>
//                 </div>
//             ))}
//         </div>
//     );
// }
import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export default function DashboardStats({ onCategoryClick }) {
    const [stats, setStats] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch(`${API_URL}/api/blogs`)
            .then(res => res.json())
            .then(data => setTotal(data.length))
            .catch(err => console.log(err));

        fetch(`${API_URL}/api/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.log(err));
    }, []);

    return (
        /* RESPONSIVE GRID BREAKPOINTS: mobile: 1, tablet: 2, desktop: 4 */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div 
                className="bg-[#0f172a] p-5 md:p-6 rounded-xl border border-slate-700 cursor-pointer hover:border-indigo-500 transition-all" 
                onClick={() => onCategoryClick('All')}
            >
                <h3 className="text-slate-400 text-sm font-medium">Total Blogs</h3>
                <p className="text-2xl md:text-3xl font-bold text-white mt-2">{total}</p>
            </div>
            
            {stats.map((s) => (
                <div 
                    key={s._id} 
                    onClick={() => onCategoryClick(s._id)} 
                    className="bg-[#0f172a] p-5 md:p-6 rounded-xl border border-slate-700 cursor-pointer hover:border-indigo-500 transition-all"
                >
                    <h3 className="text-slate-400 text-sm font-medium">{s._id}</h3>
                    <p className="text-2xl md:text-3xl font-bold text-white mt-2">{s.count} Posts</p>
                </div>
            ))}
        </div>
    );
}