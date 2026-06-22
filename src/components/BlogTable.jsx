import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
export default function BlogTable() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  // Filtering Logic
  const filteredBlogs = filter === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === filter);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <select onChange={(e) => setFilter(e.target.value)} style={{ padding: '8px' }}>
          <option value="All">All Categories</option>
          <option value="Fashion">Fashion</option>
          <option value="Culture">Culture</option>
          <option value="Tech">Tech</option>
        </select>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Title</th>
            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map(blog => (
            <tr key={blog._id}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{blog.title}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{blog.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}