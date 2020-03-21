const health = require('./health');

module.exports = (app) => {
    app.get('/_health', health);
};
