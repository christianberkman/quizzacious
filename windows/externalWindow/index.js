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
  teamArray = teamManager.getTeamArray()
  teamArray.forEach(function(teamObj){
    renderNewTeam(teamObj)
    updateTeam(teamObj)
    fitAll()
  })

  ipcRenderer.on('team-created', function(events, args){
    renderNewTeam(args[0])
    updateTeam(args[0])
    fitAll()
  })

  ipcRenderer.on('team-updated', function(events, args){
    updateTeam(args[0])
    fitAll()
  })

//
// Team
//
  // Render a new team
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

  // Update a team
  function updateTeam(teamObj){
    $(`#team${teamObj.id} h1`).html(teamObj.name)
    $(`#team${teamObj.id} h2`).html(teamObj.points)
  }

//
// Functions
//
  function fitAll(){
    $('.fit').fitText(0.9)
    $('.fit-bigger').fitText(0.45)
  }
