//
// Requirements and Dependencies
//
  var electron = require('electron')
  var ipcRenderer = electron.ipcRenderer

  var windowManager = require('electron').remote.require('./windowManager')
  var teamManager = require('electron').remote.require('./teamManager')
  window.$ = require('jquery')

  var teamObj

//
// Events
//
  // Ready
  $('#addPoints').focus()

  // Receive Team Object
  ipcRenderer.on('teamObj', function(events, argTeamObj){
    teamObj = argTeamObj
    renderTeam()
  })

  // Form Submit
  $('form').submit(function(){
    // Set the points
      addPoints = $('#addPoints').val()
      setSuccess = teamManager.addPoints(teamObj.id, addPoints)

    // Success? Close Modal
    if(setSuccess){
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
    $('h4 > span').html(teamObj.points)
  }
