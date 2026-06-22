import { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export default function CreateBlogForm({ onBlogCreated }) {
  const [categories, setCategories] = useState([]);
  const initialFormState = { title: '', category: '', content: '' };
  const [formData, setFormData] = useState(initialFormState);

  // Fetch dynamic categories
  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length > 0) setFormData(prev => ({...prev, category: data[0].name}));
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const createdBlog = await response.json();
      alert("Blog successfully added!");
      setFormData(initialFormState);
      if (onBlogCreated) onBlogCreated(createdBlog);
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Unable to create blog. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input 
        type="text" value={formData.title} placeholder="Blog Title"
        className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white"
        onChange={(e) => setFormData({...formData, title: e.target.value})} 
      />

      <select 
        value={formData.category}
        className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white"
        onChange={(e) => setFormData({...formData, category: e.target.value})}
      >
        {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
      </select>

      <textarea 
        value={formData.content} placeholder="Write your blog content here..."
        className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg text-white h-40"
        onChange={(e) => setFormData({...formData, content: e.target.value})}
      />

      <button type="submit" className="w-full py-3 bg-indigo-600 rounded-lg text-white font-semibold">
        Publish Blog
      </button>
    </form>
  );
}