class Message {
   constructor(name, commands) { //this method gets called when a new message is created
      this.name = name;
      if (!name) {
         throw Error("Message name required.");
      }
      this.commands = commands;
      }
    
    }
    


module.exports = Message;