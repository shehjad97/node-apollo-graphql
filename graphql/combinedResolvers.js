const authResolvers = require('./auth/auth.resolvers');
const userResolvers = require('./user/user.resolvers');
const testResolvers = require('./test/test.resolvers');
const contentResolvers = require('./content/content.resolvers');
const crewResolvers = require('./crew/crew.resolvers');

const combinedResolvers = [authResolvers, userResolvers, testResolvers, contentResolvers, crewResolvers];

module.exports = combinedResolvers;