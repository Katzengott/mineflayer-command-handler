const mineflayer = require('mineflayer')

const fs = require("fs");
const path = require("path");

const bot = mineflayer.createBot({
  host: 'localhost',
  username: 'd',
 auth: 'offline' 
})


const commandHandler = function(player, command, username) {
  const args = command.split(" ");
  const commandName = args[0];
  const commandPath = path.join(__dirname, "commands", `${commandName}.js`);

  fs.exists(commandPath, function(exists) {
    if (exists) {
      const commandFunction = require(commandPath);
      commandFunction(player, args, username);
    } else {
      player.chat("Sorry, that command does not exist.");
    }
  });
}

bot.on("chat", function(username, message) {
  if (message.startsWith("!")) {
    commandHandler(bot, message.slice(1),username);
  }
});
// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)
