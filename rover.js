class Rover {
   constructor(position) { //Giving rover its starting position
      this.position = position; //Where we keep track of the rover's position
      if(!position) { 
         throw Error('Rover position required');

      }
      this.mode = 'NORMAL'; //default mode is NORMAL
      this.generatorWatts = 110; //default power is 110 watts
   }
 
   receiveMessage(receivedMessage) { //rover is receiving message and following commands
      let message = receivedMessage.name; //grabbing name of the message
      let results = []; //this is where the rover will keep track of what it did in response to each command

      for (let i=0; i<receivedMessage.commands.length; i++) { //looping through each command
         if (receivedMessage.commands[i].commandType === "MOVE") { 
            if (this.mode === "LOW_POWER") {
               results.push({completed: false});     //if command is MOVE, we check if it's possible and update the rover's status
            } else {
               results.push({completed: true});
               this.position = receivedMessage.commands[i].value; 
            }
         } else if (receivedMessage.commands[i].commandType === "STATUS_CHECK") {
            results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         } else if (receivedMessage.commands[i].commandType === 'MODE_CHANGE') {
            results.push({completed: true});
            this.mode = receivedMessage.commands[i].value;
         } else {
            throw Error('Command Type undefined.');
         }
         }
         return {message, results};
      }
   }


module.exports = Rover;