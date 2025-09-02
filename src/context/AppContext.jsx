import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Predefined users
const USERS = [
  {
    id: 1,
    name: 'Sarah Connor',
    avatar: 'https://i.pravatar.cc/40?img=1',
    status: 'online'
  },
  {
    id: 2,
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/40?img=2',
    status: 'online'
  }
];

// Predefined channels
const DEFAULT_CHANNELS = [
  {
    id: 'general',
    name: 'general',
    type: 'public',
    description: 'General discussion'
  },
  {
    id: 'random',
    name: 'random',
    type: 'public', 
    description: 'Random chat'
  },
  {
    id: 'development',
    name: 'development',
    type: 'public',
    description: 'Development discussions'
  }
];

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(USERS[0]);
  const [currentChannel, setCurrentChannel] = useState(DEFAULT_CHANNELS[0]);
  const [messages, setMessages] = useState({});
  const [channels] = useState(DEFAULT_CHANNELS);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('slack-clone-messages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages({});
      }
    } else {
      // Add some sample messages for demonstration
      const sampleMessages = {
        'general': [
          {
            id: 1,
            userId: 1,
            userName: 'Sarah Connor',
            userAvatar: 'https://i.pravatar.cc/40?img=1',
            content: 'Hey team! Welcome to our Slack clone! 🎉',
            timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            reactions: [
              { emoji: '👋', users: [2], count: 1 }
            ]
          },
          {
            id: 2,
            userId: 2,
            userName: 'John Doe',
            userAvatar: 'https://i.pravatar.cc/40?img=2',
            content: 'This looks amazing! Great work on building this.',
            timestamp: new Date(Date.now() - 3000000).toISOString(), // 50 minutes ago
            reactions: [
              { emoji: '👍', users: [1], count: 1 }
            ]
          },
          {
            id: 3,
            userId: 1,
            userName: 'Sarah Connor',
            userAvatar: 'https://i.pravatar.cc/40?img=1',
            content: 'Thanks! Try switching between users using the dropdown in the top right corner.',
            timestamp: new Date(Date.now() - 2700000).toISOString(), // 45 minutes ago
            reactions: []
          }
        ],
        'development': [
          {
            id: 4,
            userId: 2,
            userName: 'John Doe',
            userAvatar: 'https://i.pravatar.cc/40?img=2',
            content: 'The real-time messaging is working great! Messages persist across user switches.',
            timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
            reactions: []
          }
        ]
      };
      setMessages(sampleMessages);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    localStorage.setItem('slack-clone-messages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (channelId, content) => {
    if (!content.trim()) return;

    const newMessage = {
      id: Date.now() + Math.random(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      content: content.trim(),
      timestamp: new Date().toISOString(),
      reactions: []
    };

    setMessages(prev => ({
      ...prev,
      [channelId]: [...(prev[channelId] || []), newMessage]
    }));
  };

  const switchUser = (userId) => {
    const user = USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const addReaction = (channelId, messageId, emoji) => {
    setMessages(prev => ({
      ...prev,
      [channelId]: prev[channelId]?.map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            // Check if current user already reacted with this emoji
            if (existingReaction.users.includes(currentUser.id)) {
              // Remove reaction
              return {
                ...msg,
                reactions: msg.reactions.map(r => 
                  r.emoji === emoji 
                    ? { ...r, users: r.users.filter(uid => uid !== currentUser.id), count: r.count - 1 }
                    : r
                ).filter(r => r.count > 0)
              };
            } else {
              // Add reaction
              return {
                ...msg,
                reactions: msg.reactions.map(r => 
                  r.emoji === emoji 
                    ? { ...r, users: [...r.users, currentUser.id], count: r.count + 1 }
                    : r
                )
              };
            }
          } else {
            // New reaction
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, users: [currentUser.id], count: 1 }]
            };
          }
        }
        return msg;
      }) || []
    }));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const value = {
    // Users
    users: USERS,
    currentUser,
    switchUser,
    
    // Channels
    channels,
    currentChannel,
    setCurrentChannel,
    
    // Messages
    messages,
    sendMessage,
    addReaction,
    
    // Utilities
    formatTime
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
