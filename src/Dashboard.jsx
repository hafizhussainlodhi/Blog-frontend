import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import BlogView from './components/BlogView';
import CategoryView from './components/CategoryView';
import UserCount from './components/UserCount'; // Sirf ye import chahiye

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openCreateForm, setOpenCreateForm] = useState(false);

  return (
    <div className="flex bg-[#0f172a] min-h-screen text-white">
      <Sidebar setActiveTab={(tab) => {
        setActiveTab(tab);
        setOpenCreateForm(false);
      }} />

      <main className="flex-1 p-8">
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-xl min-h-[80vh]">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <DashboardStats onCategoryClick={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('blogs');
              }} />
            </div>
          )}

          {activeTab === 'blogs' && <BlogView initialCategory={selectedCategory} openForm={openCreateForm} />}
          {activeTab === 'categories' && <CategoryView />}
          
          {/* Yahan sirf UserCount aayega */}
          {activeTab === 'users' && <UserCount />}
          
        </div>
      </main>
    </div>
  );
}