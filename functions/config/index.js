const { Storage } = require('@google-cloud/storage');
const serviceKey = require('./sa.json');

module.exports = new Storage({
    keyFilename: serviceKey,
    projectId: 'pyro-production',
});