//
// Requirements and Dependencies
//
  var electron = require('electron')
  var app = electron.remote.app
  var ipcRenderer = electron.ipcRenderer
  var path = require('path')

  var windowManager = require('electron').remote.require('./windowManager')
  var teamManager = require('electron').remote.require('./teamManager')
  window.$ = require('jquery')

  var teamObj

//
// Events
//
  // Receive Team Object
  ipcRenderer.on('teamObj', function(events, argTeamObj){
    teamObj = argTeamObj
    renderTeam()
  })

  // Form Submit
  $('form').submit(function(){
    // Add the points
      addPoints = $('#addPoints').val()
      addSuccess = teamManager.addPoints(teamObj.id, addPoints)

    // Success? Close Modal
    if(addSuccess){
      windowManager.closeMainModal()
      return false;
    }

    return false;
  })

  // Click Cancel
  $('#closeModal').click(function(){
    windowManager.closeMainModal()
  })

//
// Functions
//
  // Render team
  function renderTeam(){
    $('h2').html(teamObj.name)
    $('h4 .points').html(teamObj.points)
  }

//
// Debug
//
$('h2').click(function(){
  windowManager.closeMainModal()
})
