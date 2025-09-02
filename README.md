# Slack Clone - Desktop & Web Application

A fully functional Slack clone built with React, Vite, and Electron. This application provides real-time messaging, user switching, channel management, and message persistence both as a web application and a native desktop app.

![Slack Clone Screenshot](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![Electron](https://img.shields.io/badge/Electron-37.4.0-47848F)
![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF)

## 🚀 Features

### Core Messaging Features
- **Real-time Messaging**: Send and receive messages instantly across channels
- **Message Persistence**: All messages saved to localStorage and persist between sessions
- **Message Reactions**: Add and remove emoji reactions (👍, ❤️, 😄, 😮, 😢, 😡, 👏, 🎉)
- **Message Threading**: Visual message grouping with timestamps and user attribution
- **Rich Text Support**: Multi-line messages with Enter/Shift+Enter controls

### User Management
- **Dual User System**: Switch between 2 predefined accounts
  - **Sarah Connor** (User 1) - https://i.pravatar.cc/40?img=1
  - **John Doe** (User 2) - https://i.pravatar.cc/40?img=2
- **Live User Switching**: Switch users via dropdown menu in header
- **User Status Indicators**: Online status indicators and avatars

### Channel System
- **Multiple Channels**: Navigate between 3 channels
  - **#general** - General discussion
  - **#random** - Random chat
  - **#development** - Development discussions
- **Channel Switching**: Click any channel in sidebar to switch
- **Per-Channel Storage**: Messages stored separately for each channel

### UI/UX Features
- **Modern Interface**: Clean, professional Slack-inspired design
- **Responsive Layout**: Works on desktop and web browsers
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Auto-scroll**: Automatically scrolls to latest messages
- **Visual Feedback**: Active channel highlighting and user indicators

## 🛠️ Technologies Used

### Frontend Stack
- **React 19.1.1** - Modern React with latest features and hooks
- **Vite 7.1.2** - Lightning-fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for styling
- **React Icons 5.5.0** - Comprehensive icon library

### Desktop Application
- **Electron 37.4.0** - Cross-platform desktop app framework
- **Electron Reload 2.0.0** - Hot reload for development

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic CSS vendor prefixing

## 📦 Installation

### Prerequisites
- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher) or **yarn**

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd slack-clone

# Install dependencies
npm install

# Start development server (web version)
npm run dev

# Or build and run as desktop app
npm run start
```

## 🚀 Running the Application

### Web Application
```bash
npm run dev
```
- Opens at: http://localhost:5173/
- Hot reload enabled for development
- Full browser compatibility

### Desktop Application (Electron)
```bash
npm run start
```
- Builds the React app using Vite
- Launches native desktop window via Electron
- Cross-platform support (Windows, macOS, Linux)

### Available Scripts
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run electron # Run Electron app (requires build)
npm run start    # Build and run Electron app
```

## 🎯 How to Use

### Getting Started
1. **Launch Application**: Use `npm run dev` for web or `npm run start` for desktop
2. **Default State**: Starts with Sarah Connor as active user in #general channel

### User Management
1. **Switch Users**: 
   - Click user dropdown in top-right corner
   - Select between Sarah Connor and John Doe
   - User context switches immediately

### Messaging
1. **Send Messages**:
   - Type in the input field at bottom
   - Press **Enter** to send
   - Use **Shift + Enter** for new lines
2. **React to Messages**:
   - Hover over any message
   - Click emoji button to open reaction picker
   - Select from 8 common reactions

### Navigation
1. **Switch Channels**:
   - Click any channel in left sidebar
   - Active channel highlighted in blue
   - Channel name and description shown in header

## 📁 Project Structure

```
slack-clone/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation with user switching
│   │   ├── Sidebar.jsx         # Channel navigation and user list
│   │   ├── MainContent.jsx     # Main chat interface
│   │   └── Layout.jsx          # Application layout wrapper
│   ├── context/
│   │   └── AppContext.jsx      # Global state management
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # React app entry point
│   ├── index.css              # Global styles
│   └── electron.js            # Electron main process
├── public/
├── dist/                      # Built application files
├── package.json              # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── eslint.config.js         # ESLint configuration
```

## ⚡ Electron.js Integration

### Main Process (`src/electron.js`)
The Electron main process handles:
- **Window Creation**: Creates and manages the main application window
- **Window Configuration**: Sets window size, title, and behavior
- **Menu Bar**: Configures application menu (can be customized)
- **Security**: Implements secure defaults for web content
- **App Lifecycle**: Manages app startup, activation, and shutdown

### Key Electron Features
- **Native Desktop Experience**: Runs as a native app on Windows, macOS, and Linux
- **Window Management**: Proper window controls and behavior
- **System Integration**: Access to native OS features when needed
- **Hot Reload**: Development-friendly with automatic reloading
- **Production Ready**: Optimized builds for distribution

### Electron Configuration
```javascript
// Window settings in electron.js
const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    nodeIntegration: false,    // Security best practice
    contextIsolation: true,    // Security best practice
    enableRemoteModule: false  // Security best practice
  }
});
```

## 💾 Data Persistence

### Local Storage Implementation
- **Storage Key**: `slack-clone-messages`
- **Data Format**: JSON object with channel IDs as keys
- **Automatic Saving**: Messages saved immediately when sent
- **Cross-Session**: Data persists between app restarts
- **User Agnostic**: Messages visible to all users (simulating team chat)

### Sample Data Structure
```json
{
  "general": [
    {
      "id": 1,
      "userId": 1,
      "userName": "Sarah Connor",
      "userAvatar": "https://i.pravatar.cc/40?img=1",
      "content": "Hello team!",
      "timestamp": "2024-01-01T12:00:00.000Z",
      "reactions": [
        {
          "emoji": "👍",
          "users": [2],
          "count": 1
        }
      ]
    }
  ]
}
```

## 🎨 UI/UX Design

### Color Scheme
- **Sidebar**: Dark purple theme (#3F0E40) matching Slack's design
- **Main Area**: Clean white background with subtle borders
- **Active States**: Blue highlights (#1164A3) for selected items
- **Text**: Proper contrast ratios for accessibility

### Typography
- **System Fonts**: Uses system font stack for native feel
- **Font Weights**: Proper hierarchy with bold headers and regular text
- **Font Sizes**: Responsive sizing for different UI elements

### Interactive Elements
- **Hover States**: Subtle background changes on interactive elements
- **Transitions**: Smooth animations for state changes
- **Visual Feedback**: Clear indication of active states and user actions

## 🔧 Development

### State Management
- **React Context**: Global state using Context API
- **Custom Hooks**: `useApp()` hook for accessing global state
- **Local State**: Component-level state for UI interactions

### Component Architecture
- **Functional Components**: Modern React with hooks
- **Props Drilling Avoided**: Context API for shared state
- **Reusable Components**: Modular design for maintainability

### Performance Considerations
- **Auto-scroll Optimization**: Smooth scrolling to latest messages
- **Efficient Re-renders**: Proper dependency arrays and memoization
- **Local Storage**: Efficient JSON serialization/deserialization

## 🚧 Future Enhancements

### Messaging Features
- [ ] Direct messaging between users
- [ ] Message editing and deletion
- [ ] File and image sharing
- [ ] Message search functionality
- [ ] Custom emoji support
- [ ] Message formatting (bold, italic, code)

### User Features
- [ ] User profiles and settings
- [ ] User presence indicators (online/offline/away)
- [ ] User authentication system
- [ ] Multiple workspaces

### Technical Improvements
- [ ] Real-time synchronization (WebSockets)
- [ ] Database integration (SQLite/PostgreSQL)
- [ ] Message encryption
- [ ] Offline message queue
- [ ] Push notifications

### Desktop Features
- [ ] System tray integration
- [ ] Desktop notifications
- [ ] Auto-updater
- [ ] Keyboard shortcuts
- [ ] Multi-window support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).

## 📞 Support

If you have any questions or need help with the application, please create an issue in the repository.

---

**Built with ❤️ using React, Vite, and Electron**