var controller = function(args) {
    var db          = args.connector;
    var commonPages = args.pages;
    
    var actions = {};

    actions.index = {
        method  : 'get',
        path    : '/',
        handler : function(req, res, next) {
            // Query to the database.
            var strQuery = 'SELECT * FROM posts;';
            db.query(strQuery, function(err, rows, fields) {
                if (err) {
                    console.log(err);
                    return res.status(500).render(commonPages.ERROR);
                }
                else {
                    // This will render index.jade inside your `views` directory.
                    return res.status(200).render('index', {
                        posts: rows        
                    }); 
                }
            });
        }
    }

    return actions;
};

module.exports = controller;
