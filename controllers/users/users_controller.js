var controller = function(args) {
	var db          = args.connector;
	var commonPages = args.pages;
	
	var actions    = {};
	
	actions.name = 'users';
	
    actions.add = [
        {
            method  : 'get',
            path    : '/add',
            handler : function(req, res, next) {
                
            };
        },
        {}
    ];
    
    actions.login = [
        {
            method  : 'get',
            path    : '/login',
            handler : function(req, res, next) {
                if (typeof req.user != "undefined") {
                    // User has been logged in, redirect to home.
                    return res.redirect('/');
                }
                else {
                    return res.status(200).render('login', {
                        title: 'Login'
                    });
                }
            }
        },
        {
            method  : 'post',
            path    : '/login',
            handler : function(req, res, next) {
                return res.status(200).json(req.body);
            }
        }
    ];
    
    actions.logout = {
        method  : 'post',
        path    : '/logout',
        handler : function(req, res, next) {
               
        }
    };
	
	return actions;
};

module.exports = controller;
