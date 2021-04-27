'use strict';
require('dotenv').config({path:__dirname+'/.env'});
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const commands = require('./commands');

const { Client, MessageEmbed, MessageReaction } = require('discord.js');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));


const PORT = process.env['PORT'] 

const pre = './'

const client = new Client();
const getChannel= async (id) => {
  const channel = await client.channels.fetch(id)
  console.log(channel.name)
  const message = await channel.messages.fetch('834365255504101406');
  // if(message.id === '834365255504101406') {
  //   message.react('💸');
  //   message.react('💦');
  // }
}
client.on('ready', () => {
  getChannel('834330410736812053');
  
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.startsWith(pre) || !message.author.bot ) {
    const request = message.content.slice(pre.length);
    if(commands[request.split(' ')[0]] !== undefined) {
      try {
        message.delete();
        commands[request.split(' ')[0]](message);
      } catch(error) {
        console.log(error);
        message.reply("I had some issue processing this shit. \n\n\n\n\n\n I SWEAR ITS NOT CORONA :(");
      }
    } 
  }

  
  if (message.channel.name === 'minecraft-logs' && !message.author.bot && !message.content.startsWith(pre)) {
    message.reply("FUCKER MESSAGE SOMEWHERE ELSE. WHY YOU MAKE THIS CLEAN SHIT DIRTY.")
    message.delete();
  } 
  
  if(message.author.bot) {
    message.delete({timeout:10000});
  } 
});


client.on('messageReactionAdd', async messageReaction => {
  if(messageReaction._emoji.name === '💸') {
    commands['start']();
    console.log('start');
  } else if(messageReaction._emoji.name === '💦') {
    commands['stop']();
    console.log('stop');
  }
  const keys = messageReaction.users.cache.keys();
  for(let key of keys) {
    if(key !== '830799974874611772') {
      await messageReaction.users.remove(key);
    }
  }

});

app.get('/postMessage', (req, res) => {
  const channel = client.channels.cache.find(channel => channel.name === req.query.channelId);
  channel.send(req.query.message);
});

app.listen(PORT, (error) => {
	if(error) {
		console.error({ message: new Error(error) });
	} else {
		console.info(`server is up on ${PORT}`);
	}
});


client.login(process.env['DISCORD_TOKEN']);