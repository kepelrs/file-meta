import { app, BrowserWindow, Menu, Tray, nativeTheme } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;

// detect serve mode
const args = process.argv.slice(1);
let serve: boolean = args.some((val) => val === '--serve');

function createWindow() {
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  win.maximize();
  nativeTheme.themeSource = 'light';

  if (serve) {
    // get dynamic version from localhost:4200
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });

    // The following is optional and will open the DevTools:
    win.webContents.openDevTools();
    win.loadURL('http://localhost:4200');
  } else {
    // load the dist folder from Angular
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: 'file:',
        slashes: true,
        //icon: path.join(__dirname, 'assets/icons/favicon.png')
      })
    );
  }

  const menuTemplate = [
    {
      label: 'Options',
      submenu: [
        {
          label: 'Reload',
          accelerator: process.platform === 'darwin' ? 'Command+R' : 'Ctrl+R',
          click: function () {
            reload();
          },
        },
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click: function () {
            app.quit();
          },
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

  // win.on('closed', () => {
  //   win = null;
  // });
}

function reload() {
  const previousWin = win;
  createWindow();
  previousWin.close();
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    app.quit();
    // }
  });

  // initialize the app's main window
  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}
