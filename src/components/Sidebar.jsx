// // const API_URL = import.meta.env.VITE_API_URL;

// export default function Sidebar({ setActiveTab, role }) {
//   const logoUrl = 'http://localhost:3000/_next/image?url=%2Fassets%2Flogo.png&w=256&q=75'

//   const menuItems = [
//     { name: 'Dashboard', id: 'dashboard' },
//     { name: 'Blogs', id: 'blogs' },
//     { name: 'Categories', id: 'categories' },
//     ...(role === 'admin' ? [{ name: 'Users', id: 'users' }] : [])
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     window.location.href = '/login';
//   };

//   return (
//     <div className="w-64 h-screen bg-[#1e293b] p-6 border-r border-slate-700 flex flex-col">
//       {/* Logo Section */}
//       <div className="mb-12">
//         <img src={logoUrl} alt="Logo" className="w-40" />
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex flex-col gap-2 flex-grow">
//         {menuItems.map((item) => (
//           <button 
//             key={item.id}
//             onClick={() => setActiveTab(item.id)}
//             className="text-slate-400 hover:text-white hover:bg-[#2d3748] p-3 rounded-lg transition-all duration-200 text-left font-medium w-full"
//           >
//             {item.name}
//           </button>
//         ))}
//       </nav>
      
//       {/* Logout Button */}
//       <button 
//         onClick={handleLogout}
//         className="text-red-400 hover:text-white hover:bg-red-900/30 p-3 rounded-lg transition-all duration-200 text-left font-medium w-full mt-auto"
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

import { useState } from 'react';

export default function Sidebar({ setActiveTab, role }) {
  const [isOpen, setIsOpen] = useState(false);
  const logoUrl = 'http://localhost:3000/_next/image?url=%2Fassets%2Flogo.png&w=256&q=75';

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

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false); // Mobile par click hote hi menu close ho jaye
  };

  return (
    <>
      {/* Mobile Top Bar & Hamburger Button */}
      <div className="lg:hidden w-full bg-[#1e293b] text-white p-4 flex justify-between items-center border-b border-slate-700 fixed top-0 left-0 z-50">
        <img src={logoUrl} alt="Logo" className="w-28" />
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-slate-400 hover:text-white focus:outline-none p-2 rounded-md bg-[#2d3748]"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#1e293b] p-6 border-r border-slate-700 flex flex-col transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Section - Hidden on mobile top panel, visible inside drawer */}
        <div className="mb-12 mt-12 lg:mt-0">
          <img src={logoUrl} alt="Logo" className="w-40" />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 flex-grow">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => handleNavClick(item.id)}
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

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}
    </>
  );
}