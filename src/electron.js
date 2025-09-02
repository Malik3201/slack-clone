
try {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
} catch (_) {}

const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    // 👉 Development mode: React dev server load karo
    win.loadURL("http://localhost:5173"); // Vite ka default port
    win.webContents.openDevTools();
  } else {
    // 👉 Production mode: build/dist load karo
    const indexPath = path.resolve(__dirname, "../dist/index.html");

    if (fs.existsSync(indexPath)) {
      win.loadFile(indexPath);
    } else {
      console.error("❌ Could not find index.html at:", indexPath);
      app.quit();
    }
  }
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
