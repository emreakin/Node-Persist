const storage = require('node-persist');

storage.init({
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,  // can also be custom logging function
    ttl: false, // ttl* [NEW], can be true for 24h default or a number in MILLISECONDS or a valid Javascript Date object
    expiredInterval: 2 * 60 * 1000, // every 2 minutes the process will clean-up the expired cache
    // in some cases, you (or some other service) might add non-valid storage files to your
    // storage dir, i.e. Google Drive, make this true if you'd like to ignore these files and not throw an error
    forgiveParseErrors: true
});

const save = function(model) {
    storage.setItem(model.id, JSON.stringify(model));
};

const read = async function(id, callback) {
    callback(JSON.parse(await storage.getItem(id) || "{}"));
};

exports.save = save;
exports.read = read;
