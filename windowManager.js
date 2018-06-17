console.log('windowManager loaded')
//
// Dependencies and Requirements
//
  // Electron
  var electron = require('electron')
  var app = electron.app
  var BrowserWindow = electron.BrowserWindow
  var path = require('path')
  var ipcMain = electron.ipcMain

//
//  Module exports
//
  module.exports = {
    createMain, sendMain, closeMain,
    closeMainModal, modalAddPoints, modalSetPoints, modalReducePoints,
    createExternal, sendExternal
  }

//
//  Main Window
//
  let mainWindow
  mainWindow = null

  // Create Main Window
  function createMain(){
    console.log('windowManager.createMain called')

    mainWindow = new BrowserWindow({
      title: 'Quizzacious',
      width: 600,
      height: 600,
      minWidth: 440,
      minHeight: 500,
      x: 0,
      y: 0,
      devTools: true,
      show: false
    })
    if(!debugMode) mainWindow.setMenu(null)
    if(debugMode)mainWindow.webContents.openDevTools()
    mainWindow.loadURL('file://' + path.resolve(__dirname, 'windows/mainWindow/index.html'))

    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })
  }

  // Send to Main Window
  function sendMain(eventName, ...args){
    mainWindow.send(eventName, args)
  }

  // Close Main window
  function closeMain(){
    console.log('windowManager.closeMain called')
    mainWindow.close()
    mainWindow = null
  }

//
// Main Modal Window
//
    let mainModal
    mainModal = null

    // Create Main Modal Window
    function createMainModal(){
      mainModal = new BrowserWindow({
        //devTools: true,
        modal: true,
        parent: mainWindow,
        frame: false,
        title: '',
        width: 400,
        height: 225,
        resizeable: false,
        show: false
      })
      if(!debugMode) mainModal.setMenu(null)
      if(debugMode) mainModal.openDevTools()

      // Show when ready
      mainModal.once('ready-to-show', () => {
        mainModal.show()
      })
    }

    // Send to Main Modal
    function sendMainModal(eventName, ...args){
      mainModal.once('ready-to-show', () => {
        mainModal.send(eventName, args)
      })
    }

    // Close Main Modal
    function closeMainModal(){
      mainModal.close()
      mainModal = null
    }

    // Modal Add Points
    function modalAddPoints(teamObj){
      createMainModal()
      mainModal.loadURL('file://' + path.resolve(__dirname, 'windows/mainModal/addPoints.html'))

      mainModal.once('ready-to-show', () =>{
        mainModal.send('teamObj', teamObj)
        mainModal.show()
      })
    }
    // Modal Set Points
    function modalSetPoints(teamObj){
      createMainModal()
      mainModal.loadURL('file://' + path.resolve(__dirname, 'windows/mainModal/setPoints.html'))

      mainModal.once('ready-to-show', () =>{
        mainModal.send('teamObj', teamObj)
        mainModal.show()
      })
    }


    // Modal Reduce Points
    function modalReducePoints(teamObj){
      createMainModal()
      mainModal.loadURL('file://' + path.resolve(__dirname, 'windows/mainModal/reducePoints.html'))

      mainModal.once('ready-to-show', () =>{
        mainModal.send('teamObj', teamObj)
        mainModal.show()
      })
    }

  //
  //  External Window
  //
    let externalWindow
    externalWindow = null

    // Create Main Window
    function createExternal(){
      console.log('windowManager.createExternal called')

      externalWindow = new BrowserWindow({
        title: 'Quizzacious External Window',
        width: 300,
        height: 300,
        x: 480,
        y: 0,
        devTools: true,
        show: false
      })
      if(!debugMode) externalWindow.setMenu(null)
      if(debugMode) externalWindow.webContents.openDevTools()
      externalWindow.loadURL('file://' + path.resolve(__dirname, 'windows/externalWindow/index.html'))

      externalWindow.once('ready-to-show', () => {
        externalWindow.show()
      })
    }

    // Send to External Window
    function sendExternal(eventName, ...args){
      externalWindow.send(eventName, args)
    }

    // Close Main window
    function closeMain(){
      console.log('windowManager.closeMain called')
      mainWindow.close()
      mainWindow = null
    }
