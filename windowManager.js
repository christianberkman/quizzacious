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
    closeMainModal, modalAddPoints, modalReducePoints
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
      title: 'Quizz Main Window',
      width: 600,
      height: 600,
      minWidth: 440,
      minHeight: 500,
      x: 0,
      y: 0,
      devTools: true,
      show: false
    })
    mainWindow.setMenu(null)
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL('file://' + path.resolve(__dirname, 'windows/mainWindow/index.html'))

    mainWindow.once('ready-to-show', () => {
      mainWindow.show()
    })
  }

  // Send to Main Window
  function sendMain(eventName, ...args){
    console.log('windowManager.sendMain called')
    mainWindow.send(eventName, args)
  }

  // Close Main window
  function closeMain(){
    //console.log('windowManager.closeMain called')
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
        height: 220,
        resizeable: false,
        show: false
      })
      mainModal.setMenu(null)
      //mainModal.openDevTools()

      // Show when ready
      mainModal.once('ready-to-show', () => {
        mainModal.show()
      })
    }

    // Send to Main Modal
    function sendMainModal(eventName, ...args){
      console.log('windowManager.sendMain called')
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

    // Modal Reduce Points
    function modalReducePoints(teamObj){
      createMainModal()
      mainModal.loadURL('file://' + path.resolve(__dirname, 'windows/mainModal/reducePoints.html'))

      mainModal.once('ready-to-show', () =>{
        mainModal.send('teamObj', teamObj)
        mainModal.show()
      })
    }
