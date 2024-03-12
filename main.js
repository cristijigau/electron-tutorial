const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron/main");
const path = require("node:path");

const handleFileOpen = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog();
  if (!canceled) {
    return filePaths[0];
  }
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on("set-title", (event, title) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    win.setTitle(title);
  });

  ipcMain.handle("dialog:openFile", handleFileOpen);

  ipcMain.on("counter-value", (_event, value) => {
    console.log(value);
  });

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: "Increment",
          click: () => mainWindow.webContents.send("update-counter", 1),
        },
        {
          label: "Decrement",
          click: () => mainWindow.webContents.send("update-counter", -1),
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  mainWindow.loadFile("index.html");

  // Open the DevTools
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
