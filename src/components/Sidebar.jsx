import React, { useState } from "react";
import {
  BiChevronDown,
  BiPlus,
  BiHash,
  BiLock,
  BiMessageDetail,
  BiFile,
  BiBookmark,
} from "react-icons/bi";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const { channels, currentChannel, setCurrentChannel, users, currentUser } = useApp();
  const [expandedSections, setExpandedSections] = useState({
    channels: true,
    messages: true,
    apps: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-64 h-screen bg-[#3F0E40] text-gray-300 flex flex-col">
      <div className="p-4 flex items-center justify-between border-b border-[#522653] hover:bg-[#522653] cursor-pointer">
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold text-lg">Slack Clone</span>
        </div>
        <BiMessageDetail className="h-5 w-5 text-gray-400" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-4">
          <button className="w-full px-3 py-1 bg-white bg-opacity-10 rounded text-sm font-medium text-white hover:bg-opacity-20">
            Browse Slack
          </button>
        </div>

        <div className="space-y-4 pb-4">
          {/* Quick Access */}
          <div className="px-3 space-y-1">
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-400 hover:text-white">
              <BiMessageDetail className="h-5 w-5" />
              <span>Threads</span>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-400 hover:text-white">
              <BiBookmark className="h-5 w-5" />
              <span>Saved items</span>
            </div>
            <div className="flex items-center space-x-2 px-2 py-1 text-gray-400 hover:text-white">
              <BiFile className="h-5 w-5" />
              <span>Files</span>
            </div>
          </div>

          {/* Channels */}
          <div>
            <div
              className="flex items-center justify-between px-3 py-2 hover:bg-[#522653] cursor-pointer"
              onClick={() => toggleSection("channels")}
            >
              <div className="flex items-center space-x-2">
                <BiChevronDown
                  className={`h-4 w-4 transform ${
                    expandedSections.channels ? "" : "-rotate-90"
                  }`}
                />
                <span className="text-sm font-medium">Channels</span>
              </div>
              <BiPlus className="h-4 w-4 hover:text-white" />
            </div>
            {expandedSections.channels && (
              <div className="mt-1 space-y-1">
                {channels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setCurrentChannel(channel)}
                    className={`w-full flex items-center space-x-2 px-5 py-1 text-left transition-colors ${
                      currentChannel.id === channel.id 
                        ? 'bg-[#1164A3] text-white' 
                        : 'text-gray-400 hover:bg-[#522653] hover:text-white'
                    }`}
                  >
                    <BiHash className="h-4 w-4" />
                    <span>{channel.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct Messages */}
          <div>
            <div
              className="flex items-center justify-between px-3 py-2 hover:bg-[#522653] cursor-pointer"
              onClick={() => toggleSection("messages")}
            >
              <div className="flex items-center space-x-2">
                <BiChevronDown
                  className={`h-4 w-4 transform ${
                    expandedSections.messages ? "" : "-rotate-90"
                  }`}
                />
                <span className="text-sm font-medium">Direct messages</span>
              </div>
              <BiPlus className="h-4 w-4 hover:text-white" />
            </div>
            {expandedSections.messages && (
              <div className="mt-1 space-y-1">
                {users.filter(user => user.id !== currentUser.id).map(user => (
                  <div key={user.id} className="flex items-center space-x-2 px-5 py-1 text-gray-400 hover:bg-[#522653] hover:text-white cursor-pointer">
                    <div className="relative">
                      <img
                        src={user.avatar.replace('40', '24')}
                        alt=""
                        className="w-4 h-4 rounded-full"
                      />
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full absolute right-0 bottom-0 border border-[#3F0E40]"></div>
                    </div>
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
