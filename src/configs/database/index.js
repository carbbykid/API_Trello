const mongoose = require('mongoose');
const debug = require('debug')('myw-api:db');

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            //await mongoose.connect('mongodb://localhost:27017/cafo_api_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        debug('connect myw_API_01 database successfully!');
    } catch (error) {
        debug('connect myw_API_01 database failure! <' + error + '>');
    }
}

module.exports = { connect };
