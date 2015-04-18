var controller = function(args) {
    var db = args.connector;

    var actions = {};

    /* By empty-ing name of the controller, then  */
    actions.name = '';

    actions.login = [
        {
            method  : 'get',
            path    : '/login'
            handler : function(req, res, next) {
                if (typeof req.user != "undefined") {
                    return res.redirect('/');
                }
            }
        },
        {
            method  : 'post',
            path    : 'login',
            handler : function(req, res, next) {
                
            }
        }
    ];

    /* API Functions */

    actions.api_index = [
        {
            method  : 'get',
            prefix  : 'api',
            path    : '',
            handler : function(req, res, next) {
                return res.status(200).json({
                    message: 'Hello!'
                });
            }
        },
        {
            
        }
    ];

    return actions;
};

module.exports = controller;
