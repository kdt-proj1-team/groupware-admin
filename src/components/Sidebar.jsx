import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiArrowLeft, FiBriefcase, FiSettings } from 'react-icons/fi';
import useAuthStore from '../store/authStore';
import '../styles/glassmorphism.css';

const Sidebar = () => {
  const location = useLocation();
  const { isLoading, initAuth} = useAuthStore();
  
  useEffect(() => {
    if (window.CURRENT_USER) {
      useAuthStore.setState({
        user: window.CURRENT_USER, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
    } else {
      initAuth();
    }
  }, [initAuth]);
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-100 text-black' : 'text-gray-700 hover:bg-indigo-50';
  };  

  if (isLoading) {
    return (
      <div className="glass-dark h-screen w-64 fixed left-0 top-0 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-1">그룹웨어 관리자</h2>
          <p className="text-gray-300 text-sm mb-8">Admin Portal</p>
          <div className="text-white">로딩 중...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="glass-dark h-screen w-64 fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-white mb-1">그룹웨어 관리자</h2>
        <p className="text-gray-300 text-sm mb-8">Admin Portal</p>
        
        <nav className="space-y-2">
          <Link
            to="/"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/')}`}
          >
            <FiHome className={`text-lg ${location.pathname === '/' ? 'text-black' : 'text-white'}`}  />
            <span className={`${location.pathname === '/' ? 'text-black' : 'text-gray-200'}`}>대시보드</span>
          </Link>
          
          <Link
            to="/employees"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/employees')}`}
          >
            <FiUsers className={`text-lg ${location.pathname === '/employees' ? 'text-black' : 'text-white'}`}/>
            <span className={`${location.pathname === '/employees' ? 'text-black' : 'text-gray-200'}`}>임직원 관리</span>
          </Link>
          <Link
            to="/boards"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/boards')}`}
          >
            <FiBriefcase className={`text-lg ${location.pathname === '/boards' ? 'text-black' : 'text-white'}`}/>
            <span className={`${location.pathname === '/boards' ? 'text-black' : 'text-gray-200'}`}>게시판 관리</span>
          </Link>
          
          <Link
            to="/departmentpositionmanagement"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${isActive('/departmentpositionmanagement')}`}
          >
            <FiSettings className={`text-lg ${location.pathname === '/departmentpositionmanagement' ? 'text-black' : 'text-white'}`} />
            <span className={`${location.pathname === '/departmentpositionmanagement' ? 'text-black' : 'text-gray-200'}`}>부서 / 직급 관리</span>
          </Link>
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-4">
      <a
        href="/main"
        className="flex items-center space-x-2 w-full px-4 py-2 text-gray-300 hover:text-white hover:bg-blue-600 rounded-lg transition-colors duration-200"
        onClick={(e) => {
            e.preventDefault();
            window.location.href = "/main";
        }}
        >
        <FiArrowLeft />
        <span>그룹웨어 페이지로 이동</span>
    </a>

        
        <div className="text-gray-400 text-xs text-center mt-4">
          © 2025 TechX 관리자 시스템
        </div>
      </div>
    </div>
  );
};

export default Sidebar;