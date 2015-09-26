var app = require('app');
var Tray = require('tray');
var Menu = require('menu');
var BrowserWindow = require('browser-window');
var NativeImage = require('native-image');

require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var nImage = NativeImage.createFromDataUrl('data:image/png;base64,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');

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 730});
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  var appIcon = new Tray(nImage);
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
