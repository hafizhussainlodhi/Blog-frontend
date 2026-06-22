import { useState } from 'react';
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
    <div className="flex bg-[#0f172a] min-h-screen text-white">
      <Sidebar role={role} setActiveTab={(tab) => {
        setActiveTab(tab);
        setOpenCreateForm(tab === 'blogs');
        if(tab !== 'blogs') setSelectedCategory('All');
      }} />

      <main className="flex-1 p-8">
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-xl min-h-[80vh]">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <button 
                  onClick={() => { setActiveTab('blogs'); setOpenCreateForm(true); }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all"
                >
                  + Create Blog
                </button>

                {role === 'admin' && (
                  <button 
                    onClick={() => setActiveTab('users')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-all"
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

          {activeTab === 'blogs' && (
            <BlogView initialCategory={selectedCategory} openForm={openCreateForm} />
          )}

          {activeTab === 'categories' && <CategoryView />}
          
          {activeTab === 'users' && (
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-4">Total Users</h1>
              <UserCount />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}