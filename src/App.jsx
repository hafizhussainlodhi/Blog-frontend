// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import DashboardStats from './components/DashboardStats';
// import BlogView from './components/BlogView';
// import CategoryView from './components/CategoryView';
// import LoginPage from './pages/LoginPage';
// import UserCount from './components/UserCount';

// function Dashboard() {
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [openCreateForm, setOpenCreateForm] = useState(false);
  
//   const role = localStorage.getItem('role'); 

//   return (
//     <div className="flex bg-[#0f172a] min-h-screen text-white">
//       {/* Sidebar Section */}
//       <Sidebar role={role} setActiveTab={(tab) => {
//         setActiveTab(tab);
//         // FIX: Sidebar se jab 'blogs' par click ho, to direct form na khule (false rahe)
//         setOpenCreateForm(false); 
//         if(tab !== 'blogs') setSelectedCategory('All');
//       }} />

//       <main className="flex-1 p-8">
//         <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-xl min-h-[80vh]">
          
//           {/* Dashboard Tab */}
//           {activeTab === 'dashboard' && (
//             <div className="space-y-6">
//               <div className="flex gap-4">
//                 {/* Yahan click karne se form khulna chahiye */}
//                 <button 
//                   onClick={() => { setActiveTab('blogs'); setOpenCreateForm(true); }}
//                   className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all"
//                 >
//                   + Create Blog
//                 </button>

//                 {role === 'admin' && (
//                   <button 
//                     onClick={() => setActiveTab('users')}
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-all"
//                   >
//                     View User Count
//                   </button>
//                 )}
//               </div>

//               <DashboardStats onCategoryClick={(cat) => {
//                 setSelectedCategory(cat);
//                 setActiveTab('blogs');
//                 setOpenCreateForm(false); // Stats se jaane par bhi list dikhe, form nahi
//               }} />
//             </div>
//           )}

//           {/* Blogs Tab */}
//         {/* Blogs Tab */}
// {activeTab === 'blogs' && (
//   <div>
//     {/* PURANA BUTTON DETACH/REMOVE KAR DIYA HAI TAAKI DOUBLE BUTTONS NA DIKHEIN */}
//     <BlogView initialCategory={selectedCategory} openForm={openCreateForm} />
//   </div>
// )}

//           {/* Categories Tab */}
//           {activeTab === 'categories' && <CategoryView />}
          
//           {/* Users Tab */}
//           {activeTab === 'users' && role === 'admin' && (
//             <div className="p-6">
//               <h1 className="text-2xl font-bold mb-4">Total Users</h1>
//               <UserCount />
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default function App() {
//   const isAuthenticated = !!localStorage.getItem('token');

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
//         <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import BlogView from './components/BlogView';
import CategoryView from './components/CategoryView';
import LoginPage from './pages/LoginPage';
import UserCount from './components/UserCount';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openCreateForm, setOpenCreateForm] = useState(false);
  
  const role = localStorage.getItem('role'); 

  return (
    <div className="flex flex-col lg:flex-row bg-[#0f172a] min-h-screen text-white">
      {/* Sidebar Section */}
      <Sidebar role={role} setActiveTab={(tab) => {
        setActiveTab(tab);
        setOpenCreateForm(false); 
        if(tab !== 'blogs') setSelectedCategory('All');
      }} />

      {/* FIXED: Padding-top ko 'pt-20' se badha kar 'pt-24' kiya hai taaki top navbar ke peeche buttons na chhupein */}
      <main className="flex-1 p-4 md:p-8 pt-24 lg:pt-8 w-full overflow-x-hidden">
        <div className="bg-[#1e293b] p-4 md:p-6 rounded-2xl border border-slate-700 shadow-xl min-h-[80vh]">
          
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => { setActiveTab('blogs'); setOpenCreateForm(true); }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all text-sm md:text-base w-full sm:w-auto"
                >
                  + Create Blog
                </button>

                {role === 'admin' && (
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-all text-sm md:text-base w-full sm:w-auto"
                  >
                    View User Count
                  </button>
                )}
              </div>

              <DashboardStats onCategoryClick={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('blogs');
                setOpenCreateForm(false);
              }} />
            </div>
          )}

          {/* Blogs Tab */}
          {activeTab === 'blogs' && (
            <div>
              <BlogView initialCategory={selectedCategory} openForm={openCreateForm} />
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && <CategoryView />}
          
          {/* Users Tab */}
          {activeTab === 'users' && role === 'admin' && (
            <div className="p-2 md:p-6">
              <h1 className="text-xl md:text-2xl font-bold mb-4">Total Users</h1>
              <UserCount />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" /> : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}