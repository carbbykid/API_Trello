const { getMessageForClient } = require('../../utils/message');

class SiteController {
    //[GET] /
    index(req, res, next) {
        res.status(200);
        res.send(getMessageForClient(res.statusCode, 'API is connected successfully'));
    }
}

module.exports = new SiteController();
