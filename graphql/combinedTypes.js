const authTypes = require('./auth/types');
const bookTypes = require('./book/types');
const testTypes = require('./test/types');

const combinedTypes = [authTypes, bookTypes, testTypes];

module.exports = combinedTypes;