//
// Requirements and Dependencies
//
  var electron = require('electron')
  var ipcRenderer = electron.ipcRenderer

  var windowManager = require('electron').remote.require('./windowManager')
  var teamManager = require('electron').remote.require('./teamManager')
  window.$ = require('jquery')

//
// Events
//
  // Ready
  $('#addTeamName').focus()

  // Render all teams
  teamArray = teamManager.getTeamArray()
  teamArray.forEach(function(teamObj){
    renderNewTeam(teamObj)
    updateTeam(teamObj)
  })

  ipcRenderer.on('team-created', function(events, args){
    renderNewTeam(args[0])
    updateTeam(args[0])
  })

  ipcRenderer.on('team-updated', function(events, args){
    updateTeam(args[0])
  })

  // Closed External
  ipcRenderer.on('closed-external', function(){
    $('#createExternal').show()
  })

//
// Add Team
//
  // Send team to main proccess and reset form
  $('#addTeam').submit(function(event){
    event.preventDefault();

    // Check team name
    var teamName = $('#addTeamName').val()
    var newTeamID

    // Send new team to teamManager
    newTeamID = teamManager.addTeam(teamName)

    // Reset form and return
    $('#addTeam')[0].reset()
    return false;
  })

  // Render new Team
  function renderNewTeam(teamObj){
    // Clone prototype
    var newTeamRender = $('#teamProto').clone(true)

    // Set id
    var teamId = 'team' + teamObj.id
    var teamDiv = '#' + teamId
    newTeamRender.attr('id', 'team' + teamObj.id)
    newTeamRender.data('id', teamObj.id)

    // Append
    newTeamRender.appendTo('#teams')
  }

  // Update team
  function updateTeam(teamObj){
    $(`#team${teamObj.id} h2`).html(teamObj.name)
    $(`#team${teamObj.id} h3`).html(teamObj.points)
  }

//
// Points
//
$('.reduce-points').click(function(){
  teamId = $(this).closest('.team').data('id')
  teamObj = teamManager.getTeamObj(teamId)
  windowManager.modalReducePoints(teamObj)
})

$('.set-points').click(function(){
  teamId = $(this).closest('.team').data('id')
  teamObj = teamManager.getTeamObj(teamId)
  windowManager.modalSetPoints(teamObj)
})

$('.add-points').click(function(){
  teamId = $(this).closest('.team').data('id')
  teamObj = teamManager.getTeamObj(teamId)
  windowManager.modalAddPoints(teamObj)
})

//
// External Window
//
$('#createExternal').click(function(){
  windowManager.createExternal()
  $(this).hide()
})
