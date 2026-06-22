// const API_URL = import.meta.env.VITE_API_URL;

export default function Sidebar({ setActiveTab, role }) {
  const logoUrl = 'http://localhost:3000/_next/image?url=%2Fassets%2Flogo.png&w=640&q=75'

  const menuItems = [
    { name: 'Dashboard', id: 'dashboard' },
    { name: 'Blogs', id: 'blogs' },
    { name: 'Categories', id: 'categories' },
    ...(role === 'admin' ? [{ name: 'Users', id: 'users' }] : [])
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div className="w-64 h-screen bg-[#1e293b] p-6 border-r border-slate-700 flex flex-col">
      {/* Logo Section */}
      <div className="mb-12">
        <img src={logoUrl} alt="Logo" className="w-40" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2 flex-grow">
        {menuItems.map((item) => (
          <button 
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="text-slate-400 hover:text-white hover:bg-[#2d3748] p-3 rounded-lg transition-all duration-200 text-left font-medium w-full"
          >
            {item.name}
          </button>
        ))}
      </nav>
      
      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="text-red-400 hover:text-white hover:bg-red-900/30 p-3 rounded-lg transition-all duration-200 text-left font-medium w-full mt-auto"
      >
        Logout
      </button>
    </div>
  );
}