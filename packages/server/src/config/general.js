const path = require('path');

module.exports = {
    URL: process.env.URL || 'http://localhost:3001',
    PORT: process.env.PORT || 3001,
    paths: {
        files:  path.resolve(__dirname, '..', '..', 'tmp'),
    },
    database: {
        uri: process.env.MONGODB_URI || "",
    }
}