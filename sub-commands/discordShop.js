const auth = require('../utils/authorisation')
const fetch = require('node-fetch');
const { parse } = require('dotenv');
require('dotenv').config({path:__dirname+'/./../.env'});
const pre = './'
const shopCommands = {};
shopCommands.claimServerPoints = (message) => {

    if(auth.checkRole(message,'soakers')) {
        fetch(`${process.env.SERVER_IP}discordShop/claim?discordID=${message.member.user.id}`)
        .then(res => res.json())
        .then(resp => {
            message.reply(resp.message);
        });
    }  else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

shopCommands.buy = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if(parseInt(args[2]) === NaN) {
            message.reply('The instructions were simple you imbecile. \n ./buy <Item> <amount>');
        } else {
            fetch(`${process.env.SERVER_IP}discordShop/buy?discordID=${message.member.user.id}&item=${args[1]}&count=${args[2]}`)
            .then(res => res.json())
            .then(resp => {
            message.reply(resp.message);
        });
        }

        
    } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

shopCommands.sell = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if((parseInt(args[1])).toString() === 'NaN') {
            message.reply('The instructions were simple you fucking imbecile. \n ./sell <amount> \n\n server only buys back EYE OF ENDER');
        } else {
            fetch(`${process.env.SERVER_IP}discordShop/sell?discordID=${message.member.user.id}&count=${args[1]}`)
            .then(res => res.json())
            .then(resp => {
            message.reply(resp.message);
        });
        }

    } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

shopCommands.myPoints = (message) => {

    
    if(auth.checkRole(message,'soakers')) {
        fetch(`${process.env.SERVER_IP}discordShop/myPoints?discordID=${message.member.user.id}`)
        .then(res => res.json())
        .then(resp => {
            message.reply(resp.message);
        });
    }  else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

shopCommands.setSkin = (message) => {

    if(auth.checkRole(message,'soakers')) {

        const args = message.content.slice(pre.length).split(' ');

        if(args[1] === undefined) {
            message.reply('The instructions were simple you fucking imbecile. \n ./setSkin <skin name> \n\n Skins can be found from https://www.minecraftskins.com/');
        } else {
            fetch(`${process.env.SERVER_IP}discordShop/buy?discordID=${message.member.user.id}&item=skin&skinName=${args[1]}`)
            .then(res => res.json())
            .then(resp => {
            message.reply(resp.message);
        });
        }

        
    } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

shopCommands.buyTPDeath = (message) => {
    if(auth.checkRole(message,'soakers')) {
            fetch(`${process.env.SERVER_IP}discordShop/buy?discordID=${message.member.user.id}&item=deathTP`)
            .then(res => res.json())
            .then(resp => {
            message.reply(resp.message);
        });

        
    } else {
        message.reply('You dont have authorisation to play here. Go play GWENT or some shit.');
    }

}

module.exports = shopCommands;