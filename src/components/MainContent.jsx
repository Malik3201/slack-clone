import React, { useState, useRef, useEffect } from "react";
import {
  BiSmile,
  BiPaperclip,
  BiMicrophone,
  BiSend,
  BiLink,
  BiCode,
  BiListOl,
  BiBold,
  BiItalic,
  BiFile,
} from "react-icons/bi";
import { useApp } from "../context/AppContext";

export default function MainContent() {
  const { 
    currentChannel, 
    messages, 
    sendMessage, 
    addReaction, 
    formatTime, 
    currentUser 
  } = useApp();
  
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const channelMessages = messages[currentChannel.id] || [];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages]);

  // Focus input on channel change
  useEffect(() => {
    inputRef.current?.focus();
  }, [currentChannel]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(currentChannel.id, messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const commonEmojis = ['👍', '❤️', '😄', '😮', '😢', '😡', '👏', '🎉'];

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-4 space-y-6">
          {/* Welcome message for empty channels */}
          {channelMessages.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">#{currentChannel.name}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to #{currentChannel.name}!
              </h2>
              <p className="text-gray-600 mb-4">
                {currentChannel.description}
              </p>
              <p className="text-sm text-gray-500">
                This is the beginning of the #{currentChannel.name} channel.
              </p>
            </div>
          )}

          {/* Messages */}
          {channelMessages.map((message, index) => {
            const prevMessage = channelMessages[index - 1];
            const showAvatar = !prevMessage || prevMessage.userId !== message.userId;
            const isCurrentUser = message.userId === currentUser.id;
            
            return (
              <div key={message.id} className="flex items-start space-x-3 group relative">
                {showAvatar ? (
                  <img 
                    src={message.userAvatar} 
                    alt="" 
                    className="w-10 h-10 rounded mt-1" 
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center">
                    <span className="text-xs text-gray-500 opacity-0 group-hover:opacity-100">
                      {formatTime(message.timestamp).split(' ')[0]}
                    </span>
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  {showAvatar && (
                    <div className="flex items-center">
                      <span className={`font-bold ${isCurrentUser ? 'text-blue-600' : 'text-gray-900'}`}>
                        {message.userName}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                  
                  <p className="text-gray-800 mt-1 whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  
                  {/* Reactions */}
                  {message.reactions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {message.reactions.map((reaction, idx) => (
                        <button
                          key={idx}
                          onClick={() => addReaction(currentChannel.id, message.id, reaction.emoji)}
                          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs border transition-colors ${
                            reaction.users.includes(currentUser.id)
                              ? 'bg-blue-100 border-blue-300 text-blue-700'
                              : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <span>{reaction.emoji}</span>
                          <span>{reaction.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Message actions */}
                  <div className="flex items-center space-x-2 mt-2 invisible group-hover:visible">
                    <div className="relative">
                      <button 
                        onClick={() => setShowEmojiPicker(showEmojiPicker === message.id ? null : message.id)}
                        className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
                      >
                        <BiSmile className="h-4 w-4" />
                      </button>
                      
                      {showEmojiPicker === message.id && (
                        <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                          <div className="flex space-x-1">
                            {commonEmojis.map(emoji => (
                              <button
                                key={emoji}
                                onClick={() => {
                                  addReaction(currentChannel.id, message.id, emoji);
                                  setShowEmojiPicker(null);
                                }}
                                className="hover:bg-gray-100 p-1 rounded text-lg"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100">
                      Reply in thread
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="relative">
          <div className="flex items-center space-x-2 border border-gray-300 rounded-lg">
            {/* Formatting tools */}
            <div className="flex items-center space-x-1 px-3 py-2 border-r border-gray-200">
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiBold className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiItalic className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiLink className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiListOl className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiCode className="h-4 w-4" />
              </button>
            </div>
            
            {/* Text input */}
            <textarea
              ref={inputRef}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message #${currentChannel.name}`}
              className="flex-1 px-3 py-2 border-none outline-none resize-none min-h-[40px] max-h-[120px] bg-transparent"
              rows="1"
            />
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2 px-3 py-2">
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiPaperclip className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiMicrophone className="h-4 w-4" />
              </button>
              <button type="button" className="p-1 text-gray-500 hover:text-gray-700 rounded">
                <BiSmile className="h-4 w-4" />
              </button>
              <button 
                type="submit"
                disabled={!messageInput.trim()}
                className={`p-1 rounded transition-colors ${
                  messageInput.trim() 
                    ? 'text-green-600 hover:text-green-700 hover:bg-green-50' 
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <BiSend className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
        
        <div className="mt-2 text-xs text-gray-500">
          <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new line
        </div>
      </div>
    </div>
  );
}