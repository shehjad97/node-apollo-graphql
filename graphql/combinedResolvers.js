const authResolvers = require('./auth/resolvers');
const bookResolvers = require('./book/resolvers');
const testResolvers = require('./test/resolvers');

const combinedResolvers = [authResolvers, bookResolvers, testResolvers];

module.exports = combinedResolvers;