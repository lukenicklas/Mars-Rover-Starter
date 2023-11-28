const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() { 
  
  it('constructor sets position and default values for mode and generatorWatts', function() { // Test 7
    let rover = new Rover(98382)
    expect(function() {new Rover();}).toThrow(new Error('Rover position required')); //I'm making a new rover without including a position
    expect(rover.position).toEqual(98382)
    expect(rover.generatorWatts).toEqual(110)
    expect(rover.mode).toEqual('NORMAL')
  });

  it('response returned by receiveMessage contains the name of the message', function() { // Test 8
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let myMessage = new Message('TA power', commands);
      let theRover = new Rover(98382);
      let response = theRover.receiveMessage(myMessage);
      expect(response.message).toEqual('TA power') // checking if response from rover contains "TA Power"
  });

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() { // Test 9
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(response.results.length).toEqual(commands.length); // making sure two messages are returned by Rover
  });

  it('responds correctly to the status check command', function() { //Test 10
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Check Rover status', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let roverDeets = {mode: 'NORMAL', generatorWatts: 110, position: 98382};
    expect(response.results[0].roverStatus).toEqual(roverDeets); // checking to make sure the rover responds with all info needed to status check command
  });

    it('responds correctly to the mode change command', function() { //Test 11
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
      let message = new Message('Changing to LOW_POWER', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(response.results[0]).toEqual({completed: true});
      expect(rover.mode).toEqual('LOW_POWER'); //sending a command to change mode to LOW POWER and making sure it actually changes
  });

    it('responds with false completed value when attempting to move in LOW_POWER mode', function() { //Test 12
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1500)];
      let message = new Message('Cannot move in LOW_POWER mode', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(response.results[1]).toEqual({completed: false}); //Making sure that Rover won't move if in Low Power mode
  });
    
    it('responds with position for move command', function() { //Test 13
      let commands = [new Command('MOVE', 1500)];
      let message = new Message('Moving to position 1500', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(response.results[0]).toEqual({completed: true});
      expect(rover.position).toEqual(1500); //Making sure that Rover moves to position 1500 after command to do so
  });

});

