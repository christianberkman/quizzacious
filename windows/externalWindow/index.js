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
  })
  fitAll()
  dynamicCSS()

  ipcRenderer.on('team-created', function(events, args){
    renderNewTeam(args[0])
    updateTeam(args[0])
    fitAll()
    dynamicCSS()
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
  function dynamicCSS(){
    // Dynapic CSS
    var teamCount = teamManager.getTeamArray().length

    if(teamCount <= 2) $('#dynCSS').attr('href', './2x1.css');
    if(teamCount > 2 && teamCount <= 4) $('#dynCSS').attr('href', './2x2.css');
    if(teamCount > 4 && teamCount <= 9) $('#dynCSS').attr('href', './3x3.css');
  }

  function fitAll(){
    $('.fit').fitText(0.9)
    $('.fit-bigger').fitText(0.45)
  }
