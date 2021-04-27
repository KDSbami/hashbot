const Server = require('./sub-commands/server');
const Player = require('./sub-commands/player');
const discordShop = require('./sub-commands/discordShop');
const raffle = require('./sub-commands/raffle');

const pingRequest = (message) => {
    message.reply('PONG MY G.');
}

const commands = {

    'start':Server.start,
    'stop':Server.stop,
    'ping':pingRequest,
    'connect':Player.connectAccount,
    'update':Player.updateAccount,
    'claim':discordShop.claimServerPoints,
    'buy':discordShop.buy,
    'sell':discordShop.sell,
    'claimRaffle':raffle.claimRaffle,
    'roll':raffle.roll,
    'myRaffles':raffle.myRaffles,
    'myPoints':discordShop.myPoints,
    'setSkin':discordShop.setSkin,
    'buyRaffles':raffle.buyRaffle,
    'tpDeath':discordShop.buyTPDeath
}

module.exports = commands;