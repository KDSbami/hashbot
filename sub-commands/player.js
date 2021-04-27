const auth = require('../utils/authorisation')
const fetch = require('node-fetch');
const pre = './'
const playerCommands = {};

playerCommands.connectAccount = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if(args[1] !== undefined) {
            fetch(`${process.env.SERVER_IP}user/add?discordID=${message.member.user.id}&minecraftUsername=${args[1]}`)
            .then(res => res.json())
            .then(resp => {
                message.reply(resp.message);
            });
        } else {
            message.reply('The instructions were simple you idiot. \n ./connect <MINECRAFT USERNAME>');
        }
        
      }
      else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
      }

}

playerCommands.updateAccount = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if(args[1] !== undefined) {
            fetch(`${process.env.SERVER_IP}user/update?discordID=${message.member.user.id}&minecraftUsername=${args[1]}`)
            .then(res => res.json())
            .then(resp => {
                message.reply(resp.message);
            });
        } else {
            message.reply('The instructions were simple you idiot. \n ./update <MINECRAFT USERNAME>');
        }
        
      } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
      }

}


module.exports = playerCommands;