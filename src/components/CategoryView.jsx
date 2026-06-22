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
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      
      {role === 'admin' ? (
        <div className="flex gap-4 mb-8">
          <input 
            value={newCat} 
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Enter new category name" 
            className="p-3 bg-[#0f172a] border border-slate-700 rounded-lg w-64 text-white"
          />
          <button onClick={addCategory} className="bg-indigo-600 px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all">
            + Add Category
          </button>
        </div>
      ) : (
        <div className="bg-[#111827] p-4 rounded-xl border border-slate-700 text-slate-300 mb-8">
          Only admin can add new categories.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map(cat => (
          <div key={cat._id} className="bg-[#0f172a] p-4 rounded-lg border border-slate-700 text-center font-bold">
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}