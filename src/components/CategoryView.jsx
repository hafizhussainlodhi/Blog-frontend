// import { useState, useEffect } from 'react';
// const API_URL = import.meta.env.VITE_API_URL;
// export default function CategoryView() {
//   const [categories, setCategories] = useState([]);
//   const [newCat, setNewCat] = useState('');
//   const role = localStorage.getItem('role');

//   // Fetch categories from DB
//   useEffect(() => {
//     fetch(`${API_URL}/api/categories`)
//       .then(res => res.json())
//       .then(data => setCategories(data));
//   }, []);

//   const addCategory = async () => {
//     if (!newCat) return;
//     if (role !== 'admin') {
//       alert('Only admin can add categories.');
//       return;
//     }

//     const token = localStorage.getItem('token'); 

//     const res = await fetch(`${API_URL}/api/categories`, {
//       method: "POST",
//       headers: { 
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       },
//       body: JSON.stringify({ name: newCat })
//     });

//     if (res.ok) {
//       const added = await res.json();
//       setCategories([...categories, added]);
//       setNewCat('');
//     } else if (res.status === 403) {
//       alert("Aap admin/editor nahi hain ya token expire ho gaya hai!");
//     }
//   };

//   return (
//     <div className="p-6 text-white">
//       <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      
//       {role === 'admin' ? (
//         <div className="flex gap-4 mb-8">
//           <input 
//             value={newCat} 
//             onChange={(e) => setNewCat(e.target.value)}
//             placeholder="Enter new category name" 
//             className="p-3 bg-[#0f172a] border border-slate-700 rounded-lg w-64 text-white"
//           />
//           <button onClick={addCategory} className="bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all">
//             + Add Category
//           </button>
//         </div>
//       ) : (
//         <div className="bg-[#111827] p-4 rounded-xl border border-slate-700 text-slate-300 mb-8">
//           Only admin can add new categories.
//         </div>
//       )}

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {categories.map(cat => (
//           <div key={cat._id} className="bg-[#0f172a] p-4 rounded-lg border border-slate-700 text-center font-bold">
//             {cat.name}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export default function CategoryView() {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState('');
  const role = localStorage.getItem('role');

  // Fetch categories from DB
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const addCategory = async () => {
    if (!newCat) return;
    if (role !== 'admin') {
      alert('Only admin can add categories.');
      return;
    }

    const token = localStorage.getItem('token'); 

    const res = await fetch(`${API_URL}/api/categories`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ name: newCat })
    });

    if (res.ok) {
      const added = await res.json();
      setCategories([...categories, added]);
      setNewCat('');
    } else if (res.status === 403) {
      alert("Aap admin/editor nahi hain ya token expire ho gaya hai!");
    }
  };

  return (
    <div className="p-2 md:p-6 text-white">
      <h2 className="text-xl md:text-2xl font-bold mb-6">Manage Categories</h2>
      
      {role === 'admin' ? (
        /* RESPONSIVE INPUT & BUTTON CONTAINER */
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 max-w-xl">
          <input 
            value={newCat} 
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Enter new category name" 
            className="p-3 bg-[#0f172a] border border-slate-700 rounded-lg w-full text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm md:text-base"
          />
          <button 
            onClick={addCategory} 
            className="bg-indigo-600 px-6 py-3 sm:py-2 rounded-lg hover:bg-indigo-700 transition-all font-semibold text-sm md:text-base whitespace-nowrap w-full sm:w-auto"
          >
            + Add Category
          </button>
        </div>
      ) : (
        <div className="bg-[#111827] p-4 rounded-xl border border-slate-700 text-slate-300 mb-8 text-sm md:text-base">
          Only admin can add new categories.
        </div>
      )}

      {/* RESPONSIVE CATEGORIES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div 
            key={cat._id} 
            className="bg-[#0f172a] p-4 rounded-lg border border-slate-700 text-center font-bold text-sm md:text-base truncate tracking-wide hover:border-indigo-500/50 transition-all"
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}