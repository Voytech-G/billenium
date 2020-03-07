const mongoose = require('mongoose');

module.exports = config => {
    mongoose.connect(`mongodb://${config.DB_USER}:${config.DB_PASSWORD}@ds147946.mlab.com:47946/kanban-variant`, { useNewUrlParser: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));

    db.once('open', () => {
        console.log(`Created a connection to the database!`);
    });
}