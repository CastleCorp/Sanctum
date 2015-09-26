var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var BrowserWindow = require('browser-window');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 730});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  var appIcon = new Tray('assets/favicon-16x16.png');
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Home', type: 'normal', click: function() { mainWindow.loadUrl('file://' + __dirname + '/index.html'); mainWindow.show(); }  },
    { label: 'Socrates', type: 'normal', click: function() { mainWindow.loadUrl('file://' + __dirname + '/pages/socrates.html'); mainWindow.show(); }  },
    { label: 'Saintsplex', type: 'normal', click: function() { mainWindow.loadUrl('file://' + __dirname + '/pages/saintsplex.html'); mainWindow.show(); }  },
    { label: 'Canvas', type: 'normal', click: function() { mainWindow.loadUrl('file://' + __dirname + '/pages/canvas.html'); mainWindow.show(); }  },
    { type: 'separator' },
    { label: 'Hide Others', accelerator: 'Command+Shift+H', role: 'hideothers' },
    { label: 'Show All', role: 'unhide' },
    { label: 'Hide Sanctum', accelerator: 'Command+H', role: 'hide' },
    { label: 'Quit', type: 'normal', accelerator: 'Command+Q', click: function() { app.quit(); }  }
  ]);
  appIcon.setToolTip('Sanctum Quick-Links');
  appIcon.setContextMenu(contextMenu);

  var template = [
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: function(item, focusedWindow) {
            if (focusedWindow)
            focusedWindow.reload();
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: (function() {
            if (process.platform == 'darwin')
            return 'Ctrl+Command+F';
            else
            return 'F11';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform == 'darwin')
            return 'Alt+Command+I';
            else
            return 'Ctrl+Shift+I';
          })(),
          click: function(item, focusedWindow) {
            if (focusedWindow)
            focusedWindow.toggleDevTools();
          }
        },
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: function() { require('shell').openExternal('http://electron.atom.io') }
        },
      ]
    },
  ];

  if (process.platform == 'darwin') {
    template.unshift({
      label: 'Sanctum',
      submenu: [
        {
          label: 'About Sanctum',
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Sanctum' ,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { app.quit(); }
        },
      ]
    });
    // Window menu.
    template[3].submenu.push(
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        role: 'front'
      }
    );
  }

  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });
});
