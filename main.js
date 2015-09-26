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
    { label: 'Home', type: 'normal'  }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);

  //mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });
});
