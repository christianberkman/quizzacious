console.log('teamManager loaded')
//
// Dependencies and Requirements
//
  // Electron
  var electron = require('electron')
  var app = electron.app
  var path = require('path')

//
//  Module exports
//
  module.exports = {
    addTeam, getTeamObj, printTeams,
    addPoints
  }

//
//  Init
//
  let teams
  teams = []

//
//  Team Functions
//
  // Create a new team object
  function createTeamObj(id, name = "New Team", points = 0){
    //console.log('teamManager.create called')
    var teamObj = {}
    teamObj.id = id
    teamObj.name = name.substring(0, 24)
    teamObj.points = points

    console.log("New Team: " + teamObj.name)

    // Return the object
    return teamObj
  }

  // Check if team exists
  function teamExists(teamId){
    if(typeof teams[teamId] === 'object') return true
    return false
  }

  // Get the team object from the array
  function getTeamObj(teamId){
    //console.log("teamManager.getTeamObj called")

    // Check if team exists
    if(teamExists(teamId) == false) return false

    // Get and return team object
    var teamObj = teams[teamId]
    return teamObj
  }

  // Add team object to array
  function addTeam(name = "New Team", points = 0){
    //console.log('teamManager.addTeam called')

    // Input
    if(!name) return false
    points = parseInt(points)

    // Create and add new team
    var newTeamId = teams.length
    var newTeam = createTeamObj(newTeamId, name, points)
    teams.push(newTeam)

    // Notify windows
    windowManager.sendMain('team-created', newTeam)

    // Return Id
    return newTeam.id
  }

//
// Point functions
//

  // Add Points
  function addPoints(teamId, points){
    //console.log('teamManager.addPoints called')

    // Input
      points = parseInt(points)
      if(Number.isInteger(points) == false) return false

    // Retrieve Team Object
      var teamObj = teams[teamId]
      if(teamObj === undefined) return false
      teamObj.points += points
      teams[teamObj.id] = teamObj

    // Notify windows
      windowManager.sendMain('team-updated', teams[teamId])

    // Done
    return true
  }

//
// Print teams
//
  function printTeams(){
    console.log(teams)
  }
