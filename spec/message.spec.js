const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() { //Test 4
        expect( function() { new Message();}).toThrow(new Error('Message name required.'));
    });
    it("constructor sets name", function() {
        let message = new Message('Test message with two commands'); //Test 5
        expect(message.name).toEqual('Test message with two commands');
    });
    it("contains a commands array passed into the constructor as the 2nd argument", function() { //Test 6
        let message = new Message('Test message with two commands', ['MODE_CHANGE', 'LOW-POWER']);
        expect(message.commands).toEqual(['MODE_CHANGE', 'LOW-POWER']);
    })
});
