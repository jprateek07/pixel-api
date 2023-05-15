const express = require("express");
const cors = require("cors");
const app = express();

const {
  Collection,
  
} = require('discord.js');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Collection();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Number of guilds: ${client.guilds.cache.size}`);
});

var corsOptions = {
  origin: "http://localhost:8787"
};

const db = require("./app/models");
db.sequelize.sync();
client.on('message', async message => {
  const args = message.content.slice('/').trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === '/ppcreateuser') {
    try {
      let userInputs = message.content.slice(14).split(/ +/)
      let uname = userInputs[1]
      let email = userInputs[3]
      let password = userInputs[5]
      const user = await db.User.create({
        username: uname,
        email: email,
        password: password,
      });
      return message.channel.send(`user ${user.username} added.`);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return message.channel.send('That user already exists.');
      }

      return message.channel.send('Something went wrong with adding a user.');
    }
  } else if (command === '/ping') {
      return message.channel.send('pong.');
  }
});
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.json({
    message: "Hello world!"
  });
});
require("./app/routes/subscription-routes")(app);
require("./app/routes/user-routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Running on port ", PORT);
});
client.login('MTEwNjQ0NDc3MjY1MjEwNTg3OA.Gj6BoF.YHbQ5R4Pf9P7h2LYoii5WD_tYIOHriAPsquxgo');