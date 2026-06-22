// import { useState, useEffect } from 'react';
// import CreateBlogForm from './CreateBlogForm';
// const API_URL = import.meta.env.VITE_API_URL;

// export default function BlogView({ initialCategory, openForm }) {
//   const [blogs, setBlogs] = useState([]);
//   const [filter, setFilter] = useState(initialCategory || 'All');
//   const [isCreating, setIsCreating] = useState(false);
//   const [editingBlog, setEditingBlog] = useState(null);
//   const [editFormData, setEditFormData] = useState({ title: '', category: '', content: '' });
//   const [categories, setCategories] = useState([]);
//   const role = localStorage.getItem('role');
//   const blogImageUrl = "http://localhost:3000/_next/image?url=%2Fassets%2Fblog-1.webp&w=3840&q=75"

//   // Jab bhi initialCategory change ho (yaani sidebar se click ho), form ko band karke list dikhayein
//   useEffect(() => {
//     setFilter(initialCategory || 'All');
//     setIsCreating(false); // Yeh line ensure karegi ke pehle list dikhe
//   }, [initialCategory]);

//   useEffect(() => {
//     setIsCreating(openForm);
//   }, [openForm]);

//   useEffect(() => {
//     fetch( `${API_URL}/api/categories`)
//       .then(res => res.json())
//       .then(data => setCategories(data))
//       .catch(err => console.error("Error fetching categories:", err));
//   }, []);

//   useEffect(() => {
//     fetch( `${API_URL}/api/blogs`)
//       .then(res => res.json())
//       .then(data => setBlogs(data))
//       .catch(err => console.error("Error fetching blogs:", err));
//   }, []);

//   const filteredBlogs = filter === 'All' ? blogs : blogs.filter(b => b.category === filter);

//   const handleBlogCreated = (createdBlog) => {
//     setBlogs(prev => [createdBlog, ...prev]);
//     setIsCreating(false);
//   };

//   const startEdit = (blog) => {
//     setEditingBlog(blog);
//     setEditFormData({ title: blog.title, category: blog.category, content: blog.content });
//     setIsCreating(false);
//   };

//   const cancelEdit = () => {
//     setEditingBlog(null);
//     setEditFormData({ title: '', category: '', content: '' });
//   };

//   const saveEdit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_URL}/api/blogs/${editingBlog._id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(editFormData)
//     });

//     if (response.ok) {
//       const updatedBlog = await response.json();
//       setBlogs(prev => prev.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
//       cancelEdit();
//       alert('Blog updated successfully!');
//     } else {
//       const errorData = await response.json();
//       alert(errorData.message || 'Unable to update blog.');
//     }
//   };

//   const deleteBlog = async (blogId) => {
//     if (!window.confirm('Are you sure you want to delete this blog?')) return;
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${API_URL}/api/blogs/${blogId}`, {
//       method: 'DELETE',
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     if (response.ok) {
//       setBlogs(prev => prev.filter(blog => blog._id !== blogId));
//       alert('Blog deleted successfully!');
//     } else {
//       const errorData = await response.json();
//       alert(errorData.message || 'Unable to delete blog.');
//     }
//   };

//   return (
//     <div className="p-6 text-white min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-2xl font-bold">{isCreating ? 'Create New Blog' : 'Manage Blogs'}</h2>
//         <button 
//           onClick={() => setIsCreating(!isCreating)} 
//           className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition-all"
//         >
//           {isCreating ? 'View All Blogs' : '+ Create Blog'}
//         </button>
//       </div>

//       {isCreating ? (
//         <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700">
//           <CreateBlogForm />
//         </div>
//       ) : (
//         <div className="space-y-6">
//           <select 
//             value={filter} 
//             onChange={(e) => setFilter(e.target.value)} 
//             className="w-full md:w-64 p-3 bg-[#1e293b] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           >
//             <option value="All">All Categories</option>
//             <option value="Fashion">Fashion</option>
//             <option value="Culture">Culture</option>
//             <option value="Tech">Tech</option>
//             <option value="Food">Food</option>
//             <option value="Travel">Travel</option>
//           </select>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {filteredBlogs.map(blog => (
//               <div key={blog._id} className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden hover:shadow-2xl hover:border-indigo-500 transition-all duration-300">
//                 <img src={blogImageUrl} alt="Blog" className="w-full h-56 object-cover" />
//                 <div className="p-5">
//                   <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">{blog.category}</span>
//                   <h3 className="text-xl font-bold mt-2 mb-2">{blog.title}</h3>
//                   <p className="text-slate-400 text-sm">By Admin • 2026-06-18</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
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
  const blogImageUrl = "http://localhost:3000/_next/image?url=%2Fassets%2Fblog-1.webp&w=3840&q=75";

  // Handle newly created blog from the form
  const handleBlogCreated = (createdBlog) => {
    setBlogs(prev => [createdBlog, ...prev]);
    setIsCreating(false);
  };

  useEffect(() => {
    setFilter(initialCategory || 'All');
    setIsCreating(false); 
    setEditingBlog(null);
  }, [initialCategory]);

  useEffect(() => {
    setIsCreating(openForm);
  }, [openForm]);

  useEffect(() => {
    fetch(`${API_URL}/api/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error("Error fetching blogs:", err));
  }, []);

  const filteredBlogs = filter === 'All' ? blogs : blogs.filter(b => b.category === filter);

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

  // Function to format MongoDB createdAt date into readable string
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }); // Output example: "Jun 22, 2026"
  };

  return (
    <div className="p-2 md:p-4 text-white min-h-screen">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h2 className="text-xl md:text-2xl font-bold">
          {isCreating ? 'Create New Blog' : editingBlog ? 'Edit Blog' : 'Manage Blogs'}
        </h2>
        <button 
          onClick={() => {
            if(editingBlog) cancelEdit();
            setIsCreating(!isCreating);
          }} 
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg transition-all text-sm w-full sm:w-auto"
        >
          {isCreating || editingBlog ? 'View All Blogs' : '+ Create Blog'}
        </button>
      </div>

      {/* Conditionally Render Edit, Create or Grid view */}
      {editingBlog ? (
        <form onSubmit={saveEdit} className="bg-[#1e293b] p-5 md:p-8 rounded-2xl border border-slate-700 space-y-4 max-w-2xl mx-auto">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Title</label>
            <input 
              type="text" 
              value={editFormData.title} 
              onChange={e => setEditFormData({...editFormData, title: e.target.value})}
              className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Category</label>
            <select 
              value={editFormData.category} 
              onChange={e => setEditFormData({...editFormData, category: e.target.value})}
              className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Fashion">Fashion</option>
              <option value="Culture">Culture</option>
              <option value="Tech">Tech</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Content</label>
            <textarea 
              value={editFormData.content} 
              rows="6"
              onChange={e => setEditFormData({...editFormData, content: e.target.value})}
              className="w-full p-3 bg-[#0f172a] border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
              required
            ></textarea>
          </div>
          <div className="flex gap-4 pt-2">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg transition-all text-sm flex-1">Save Changes</button>
            <button type="button" onClick={cancelEdit} className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg transition-all text-sm flex-1">Cancel</button>
          </div>
        </form>
      ) : isCreating ? (
        <div className="bg-[#1e293b] p-4 md:p-8 rounded-2xl border border-slate-700">
          <CreateBlogForm onBlogCreated={handleBlogCreated} />
        </div>
      ) : (
        <div className="space-y-6">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)} 
            className="w-full sm:w-64 p-3 bg-[#1e293b] border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            <option value="Fashion">Fashion</option>
            <option value="Culture">Culture</option>
            <option value="Tech">Tech</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <div key={blog._id} className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <img src={blogImageUrl} alt="Blog" className="w-full h-48 md:h-56 object-cover" />
                  <div className="p-5">
                    <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">{blog.category}</span>
                    <h3 className="text-lg md:text-xl font-bold mt-2 mb-2 line-clamp-2">{blog.title}</h3>
                    {/* CHANGED: Static date ki jagah ab database se blog.createdAt lekar format kiya hai */}
                    <p className="text-slate-400 text-xs md:text-sm">By Admin • {formatDate(blog.createdAt)}</p>
                    <p className="text-slate-300 text-sm mt-3 line-clamp-3">{blog.content}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-3 mt-auto">
                  <button 
                    onClick={() => startEdit(blog)}
                    className="flex-1 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white py-2 rounded-lg text-xs font-semibold transition-all border border-indigo-500/30"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteBlog(blog._id)}
                    className="flex-1 bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white py-2 rounded-lg text-xs font-semibold transition-all border border-red-500/30"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredBlogs.length === 0 && (
            <p className="text-slate-500 text-center py-12">No blogs found in this category.</p>
          )}
        </div>
      )}
    </div>
  );
}