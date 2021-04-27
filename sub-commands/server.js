const auth = require('../utils/authorisation')
const fetch = require('node-fetch');

const serverCommands = {};

serverCommands.start = () => {
    fetch(`${process.env.SERVER_IP}server/start`)
    .then(res => res.json())
    .then(resp => console.log(''));      
}

serverCommands.stop = () => {

    fetch(`${process.env.SERVER_IP}server/stop`)
    .then(res => res.json())
    .then(resp => console.log(''));

}

module.exports = serverCommands;