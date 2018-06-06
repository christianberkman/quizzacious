console.log('teamManager loaded')
//
// Dependencies and Requirements
//
  // Electron
  var path = require('path')

//
//  Module exports
//
  module.exports = {
    getTeamObj, getTeamArray, addTeam,
    addPoints, setPoints, reducePoints
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
    var teamObj = {}
    teamObj.id = id
    teamObj.name = name.substring(0, 24)
    teamObj.points = points

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
    // Check if team exists
    if(teamExists(teamId) == false) return false

    // Get and return team object
    var teamObj = teams[teamId]
    return teamObj
  }

  // Get the team array
  function getTeamArray(){
    return teams;
  }

  // Add team object to array
  function addTeam(name = "New Team", points = 0){
    // Input
    if(!name) return false
    points = parseInt(points)

    // Create and add new team
    var newTeamId = teams.length
    var newTeam = createTeamObj(newTeamId, name, points)
    teams.push(newTeam)

    // Notify windows
    windowManager.sendMain('team-created', newTeam)
    windowManager.sendExternal('team-created', newTeam)
    console.log('New Team: ' + newTeam.name + ' (' + newTeam.id +')')

    // Return Id
    return newTeam.id
  }

//
// Point functions
//
  // Add Points
  function addPoints(teamId, points){
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
    windowManager.sendExternal('team-updated', teams[teamId])

    // Done
    return true
  }

  // Set Points
  function setPoints(teamId, points){
    // Input
    points = parseInt(points)
    if(Number.isInteger(points) == false) return false

    // Retrieve Team Object
    var teamObj = teams[teamId]
    if(teamObj === undefined) return false
    teamObj.points = points
    teams[teamObj.id] = teamObj

    // Notify windows
    windowManager.sendMain('team-updated', teams[teamId])
    windowManager.sendExternal('team-updated', teams[teamId])

    // Done
    return true
  }

  // Reduce Points
  function reducePoints(teamId, points){
    // Input
    points = parseInt(points)
    if(Number.isInteger(points) == false) return false

    // Retrieve Team Object
    var teamObj = teams[teamId]
    if(teamObj === undefined) return false
    teamObj.points -= points
    teams[teamObj.id] = teamObj

    // Notify windows
    windowManager.sendMain('team-updated', teams[teamId])
    windowManager.sendExternal('team-updated', teams[teamId])

    // Done
    return true
  }
