//
// Requirements and Dependencies
//
  var electron = require('electron')
  var ipcRenderer = electron.ipcRenderer

  var windowManager = require('electron').remote.require('./windowManager')
  var teamManager = require('electron').remote.require('./teamManager')
  window.$ = require('jquery')
  require('../../assets/jquery.fittext')

//
// Events
//
  // Ready
  $('p').fitText(1.4)
