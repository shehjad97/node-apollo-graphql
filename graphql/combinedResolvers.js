const bookResolvers = require('./book/resolvers');
const testResolvers = require('./test/resolvers');

const combinedResolvers = [bookResolvers, testResolvers];

module.exports = combinedResolvers;