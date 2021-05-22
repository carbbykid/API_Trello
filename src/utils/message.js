const { VERSION } = require('../constants');

exports.getMessageForClient = (status_code, message) => {
    return {
        api_name: 'myw',
        version: VERSION,
        status_code: status_code,
        message: message,
    };
};
