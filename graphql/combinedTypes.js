const authTypes = require('./auth/auth.types');
const userTypes = require('./user/user.types');
const testTypes = require('./test/test.types');
const contentTypes = require('./content/content.types');
const crewTypes = require('./crew/crew.types');

const combinedTypes = [authTypes, userTypes, testTypes, contentTypes, crewTypes];

module.exports = combinedTypes;