
const auth = {} ;

auth.checkRole = (message, serverRole) => {
    return message.member.roles.cache.some(role => role.name === serverRole)
}

module.exports = auth;