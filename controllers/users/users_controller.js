var controller = function(args) {
	var db          = args.connector;
	var commonPages = args.pages;
	
	var actions    = {};
	
	actions.name = 'users';
	
    actions.login = [
        {
            method  : 'get',
            path    : '/login',
            handler : function(req, res, next) {
                if (typeof req.user != "undefined") {
                    return res.redirect('/');
                }
            }
        },
        {
            method  : 'post',
            path    : '/login',
            handler : function(req, res, next) {
                
            }
        }
    ];
	
	return actions;
};

module.exports = controller;
