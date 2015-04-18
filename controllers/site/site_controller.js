var controller = function(args) {
    var actions = {};

    /* 
        By empty-ing name of the controller, then you put the controller as 
        a root controller to handle your root url ('/'). 
    */
    actions.name = '';
    
    /* Regular Pages */

    actions.index = {
        method  : 'get',
        path    : '',
        handler : function(req, res, next) {
            return res.status(200).render('index', {
                title: 'Hello!'
            });
        }
    };
    
    /* API Functions */

    actions.api_index = {
        method  : 'get',
        prefix  : 'api',
        path    : '',
        handler : function(req, res, next) {
            return res.status(200).json({
                message: 'Hello!'
            });
        }
    };

    return actions;
};

module.exports = controller;
