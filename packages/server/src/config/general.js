const path = require('path');

module.exports = {
    URL: process.env.URL || 'http://localhost:3001',
    PORT: process.env.PORT || 3001,
    paths: {
        files:  path.resolve(__dirname, '..', '..', 'tmp'),
    },
    database: {
        uri: 'mongodb+srv://cluster-omni-stack-rocketseat-root:roJMX3RQuGTO9tlV@cluster-omni-stack-rocketseat-lurbm.mongodb.net/test?retryWrites=true',
    }
}