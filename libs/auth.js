var auth = function() {
    var	_           = require('underscore'),
        passport    = require('passport')
        ;

    var obj = {};

    obj.check = function(req, res, next) {
        if (!req.isAuthenticated()) {
            if (req.originalUrl.indexOf('/api/') != -1) {
                return res.status(500).json({
                    success: false,
                    message: 'You\'re not authorized to access this resource.'
                });
            }
            else {
                return res.redirect('/users/login'); }
            }
        }
        else {
            return next();
        }
    }

    return obj;
};

module.exports = auth;
