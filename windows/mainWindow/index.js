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
ipcRenderer.on('team-created', function(events, args){
  renderNewTeam(args[0])
  updateTeam(args[0])
})

ipcRenderer.on('team-updated', function(events, args){
  updateTeam(args[0])
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
    $(`#team${teamObj.id} h3`).html(teamObj.name)
    $(`#team${teamObj.id} h4 span`).html(teamObj.points)
  }

//
// Points
//
$('.reduce-points').click(function(){
})

$('.add-points').click(function(){
  teamId = $(this).closest('.team').data('id')
  teamObj = teamManager.getTeamObj(teamId)
  windowManager.modalAddPoints(teamObj)
})

//
// Debug
//
teamManager.addTeam('Katie and Christian')
teamManager.addTeam('The World')
teamManager.addTeam('Aliens')
