const auth = require('../utils/authorisation')
const fetch = require('node-fetch');
require('dotenv').config({path:__dirname+'/./../.env'});
const pre = './'
const raffleCommands = {};
const hookerURL =' https://discord.com/api/webhooks/832931590006767616/LAtRatTvOE9Kh7XH-M0kN8Qq0kfbt7moIwHH1r_q4mrjJPs4Lyo-sOteznRWKYJ7XjgY';

const hookHeaders = new fetch.Headers();
hookHeaders.append("Content-Type", "application/json");

const requestOptions = {
    method: 'POST',
    headers: hookHeaders,
    redirect: 'follow'
  };

raffleCommands.claimRaffle = (message) => {

    if(auth.checkRole(message,'soakers')) {
        fetch(`${process.env.SERVER_IP}raffle/claim?discordID=${message.member.user.id}`)
        .then(res => res.json())
        .then(resp => {
            message.reply(resp.message);
        });
    }  else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

raffleCommands.roll = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if(parseInt(args[2]) === NaN) {
            message.reply('The instructions were simple you dummy. \n ./buy <Item> <amount>');
        } else {
            fetch(`${process.env.SERVER_IP}raffle/gamble?discordID=${message.member.user.id}`)
            .then(res => res.json())
            .then(resp => {
                if(resp.hook !== undefined) {
                    const hook = resp.hook;
                    hook.embeds[0].author = {
                    name:message.author.username,
                    icon_url:message.author.avatarURL()
                    }

                    requestOptions.body = JSON.stringify(hook)
                    fetch(hookerURL, requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                } else {
                    message.reply(resp.message);
                }
                
        });
        }


    } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

raffleCommands.myRaffles = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if(parseInt(args[2]) === NaN) {
            message.reply('The instructions were simple you dummdumm. \n /buy <Item> <amount>');
        } else {
            fetch(`${process.env.SERVER_IP}raffle/myRaffles?discordID=${message.member.user.id}`)
            .then(res => res.json())
            .then(resp => {
            message.reply(resp.message);
        });
        }


    } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

raffleCommands.buyRaffle = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if(args[1] !== undefined) {
            fetch(`${process.env.SERVER_IP}raffle/buyRaffle?discordID=${message.member.user.id}&count=${args[1]}`)
            .then(res => res.json())
            .then(resp => {
            message.reply(resp.message);
        });
        } else {
            message.reply('The instructions were simple you dumbo. \n ./buyRaffles <Count>');
        }
        

    } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

module.exports = raffleCommands;