import { useState, useEffect } from 'react';
import CreateBlogForm from './CreateBlogForm';
const API_URL = import.meta.env.VITE_API_URL;
export default function BlogView({ initialCategory, openForm }) {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState(initialCategory || 'All');
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', category: '', content: '' });
  const [categories, setCategories] = useState([]);
  const role = localStorage.getItem('role');
  const blogImageUrl = "http://localhost:3000/_next/image?url=%2Fassets%2Fblog-1.webp&w=3840&q=75"

  useEffect(() => {
    setFilter(initialCategory || 'All');
  }, [initialCategory]);

  useEffect(() => {
    setIsCreating(openForm);
  }, [openForm]);

  useEffect(() => {
    fetch( `${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    fetch( `${API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  const filteredBlogs = filter === 'All' ? blogs : blogs.filter(b => b.category === filter);

  const handleBlogCreated = (createdBlog) => {
    setBlogs(prev => [createdBlog, ...prev]);
    setIsCreating(false);
  };

  const startEdit = (blog) => {
    setEditingBlog(blog);
    setEditFormData({ title: blog.title, category: blog.category, content: blog.content });
    setIsCreating(false);
  };

  const cancelEdit = () => {
    setEditingBlog(null);
    setEditFormData({ title: '', category: '', content: '' });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/blogs/${editingBlog._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(editFormData)
    });

    if (response.ok) {
      const updatedBlog = await response.json();
      setBlogs(prev => prev.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
      cancelEdit();
      alert('Blog updated successfully!');
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Unable to update blog.');
    }
  };

  const deleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/blogs/${blogId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      setBlogs(prev => prev.filter(blog => blog._id !== blogId));
      alert('Blog deleted successfully!');
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Unable to delete blog.');
    }
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{isCreating ? 'Create New Blog' : 'Manage Blogs'}</h2>
        <button 
          onClick={() => setIsCreating(!isCreating)} 
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition-all"
        >
          {isCreating ? 'View All Blogs' : '+ Create Blog'}
        </button>
      </div>

      {isCreating ? (
        <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700">
          <CreateBlogForm />
        </div>
      ) : (
        <div className="space-y-6">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="w-full md:w-64 p-3 bg-[#1e293b] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Fashion">Fashion</option>
            <option value="Culture">Culture</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs.map(blog => (
              <div key={blog._id} className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden hover:shadow-2xl hover:border-indigo-500 transition-all duration-300">
                <img src={blogImageUrl} alt="Blog" className="w-full h-56 object-cover" />
                <div className="p-5">
                  <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">{blog.category}</span>
                  <h3 className="text-xl font-bold mt-2 mb-2">{blog.title}</h3>
                  <p className="text-slate-400 text-sm">By Admin • 2026-06-18</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}