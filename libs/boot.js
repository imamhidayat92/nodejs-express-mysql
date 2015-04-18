var express = require('express'),
    fs      = require('fs'),
    _       = require('underscore')
    ;

module.exports = function(parent, args, options) {
    
    var verbose = options.verbose;

    var appendSpace = function(str, n) {
        var tmp = str;
        
        for (var i = 0; i < n; i++) {
            tmp += " ";
        }

        return tmp;
    }

    var loadAction = function(app, actionObject, actionName, rootPath) {
        var action = actionObject;

        var actionPath = '';

        if (typeof action.prefix != "undefined") {
            actionPath = '/' + action.prefix + rootPath + action.path;
        }
        else {
            actionPath = rootPath + action.path;
        }

        if (action.before) {
            app[action.method](actionPath, action.before, action.handler);
            verbose && console.log('    %s %s -> before -> %s', appendSpace(action.method.toUpperCase(), 5 - action.method.length), actionPath, actionName);
        } else {
            app[action.method](actionPath, action.handler);
            verbose && console.log('    %s %s -> %s', appendSpace(action.method.toUpperCase(), 5 - action.method.length), actionPath, actionName);
        }
    }

    verbose && console.log('----- Boot Up!');

    fs.readdirSync(__dirname + '/../controllers').forEach(function(directoryName) {
        verbose && console.log('\n  %s:', directoryName);

        var controller = require('./../controllers/' + directoryName + '/' + directoryName + '_controller')(args);
        var name = typeof controller.name == "undefined" ? directoryName : controller.name;
        
        var app = express();
        var action;

        var path = controller.path || '/' + name;

        app.set('views', './controllers/' + directoryName + '/views');

        for (var action in controller) {

            if (~['name'].indexOf(action)) continue;
            
            if (_.isArray(controller[action])) {
                for (var i = 0; i < controller[action].length; i++) {
                    loadAction(app, controller[action][i], action + '[' + i + ']', path);
                }
            }
            else {
                loadAction(app, controller[action], action, path);
            }
        }

        parent.use(app);
    });

    verbose && console.log();
    verbose && console.log('----- End of Boot Up.');
    verbose && console.log();
};
