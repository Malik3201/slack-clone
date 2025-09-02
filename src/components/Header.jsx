import React, { useState, useEffect, useRef } from "react";
import { BiSearch, BiTime, BiHelpCircle, BiChevronDown } from "react-icons/bi";
import { useApp } from "../context/AppContext";

export default function Header() {
  const { currentUser, users, switchUser, currentChannel } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold text-gray-800">#{currentChannel.name}</h2>
          <span className="text-sm text-gray-500">{currentChannel.description}</span>
        </div>
        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 pl-9 pr-4 py-1.5 rounded-md text-sm text-gray-700 placeholder-gray-500 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-72"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <BiHelpCircle className="h-5 w-5 text-gray-500 hover:text-gray-600 cursor-pointer" />
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-md p-1 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="w-8 h-8 rounded-full border-2 border-gray-200"
            />
            <span className="text-sm font-medium text-gray-700">{currentUser.name}</span>
            <BiChevronDown className="h-4 w-4 text-gray-500" />
            <div className="w-2 h-2 bg-green-500 rounded-full absolute ml-6 mb-5 border-2 border-white"></div>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Switch User</div>
                {users.map(user => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchUser(user.id);
                      setShowUserMenu(false);
                    }}
                    className={`w-full flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-left ${
                      user.id === currentUser.id ? 'bg-blue-50 border-l-2 border-blue-500' : ''
                    }`}
                  >
                    <img src={user.avatar} alt="" className="w-6 h-6 rounded-full" />
                    <span className="text-sm">{user.name}</span>
                    {user.id === currentUser.id && (
                      <span className="text-xs text-blue-500 ml-auto">Active</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
