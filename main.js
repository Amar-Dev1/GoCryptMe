const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },

    icon: path.join(__dirname, "build/icon.png"),
  });
  win.maximize();
  win.show();
  win.loadFile(path.join(__dirname, "ui_dist/index.html"));

  const template = [
    {
      label: "File",
      submenu: [{ role: "quit", label: "Exit" }],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "About",
      submenu: [
        {
          label: "Contribute",
          click: () => {
            shell.openExternal(
              "https://github.com/Amar-Dev1/GoCryptMe#contributing"
            );
          },
        },
        {
          label: "Repository",
          click: () => {
            shell.openExternal("https://github.com/Amar-Dev1/GoCryptMe");
          },
        },
        {
          label: "Author",
          click: () => {
            shell.openExternal("https://github.com/Amar-Dev1");
          },
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Contact",
          click: () => {
            shell.openExternal("mailto:amarofficial249@gmail.com");
          },
        },
      ],
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
