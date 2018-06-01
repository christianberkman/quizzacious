//
// Dependencies and Requirements
//
  // Electron
  var electron = require('electron')
  var app = electron.app
  var ipcMain = electron.ipcMain

  // Quizz
  global.windowManager = require('./windowManager')
  global.teamManager = require('./teamManager')

//
// App Ready
//

  app.on('ready', function () {
    console.log('App Ready')
    windowManager.createMain()
  })

//
//  Default app behavior stuff
//
  // Quit when all windows are closed.
  app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })
