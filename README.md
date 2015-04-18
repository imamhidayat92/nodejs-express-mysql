Simple Web App Framework using Node.js, Express and MySQL
=========================================================

# Getting Started

Follow the instructions below to start your server.

## Create Configuration File

In root directory, create new file named `config.js`. Change the settings to your own need.

```javascript
/* File: config.js */
module.exports = {
    app : {
        name: 'node-mysql',
        protocol: 'http',
        port: 8080,
        version: '1.0.0'
    },
    mysql: {
        host: 'localhost',
        port: 3306,
        user: '<database user>',
        password: '<password>',
        database: '<database name>'
    },
    morgan: {
        mode: 'dev'
    }
};
```

The `app` section define your app information, `mysql` for data source configuration, and `morgan` for logger. For `morgan`, there are 5 modes that you can use: `combined`, `common`, `dev`, `short`, and `tiny`. See `morgan` repository for further information.

## Installing Dependencies

Open your command prompt (Node.js command prompt if you use Windows), `cd` to the root directory of your server and type the following command:

```shell
npm install
```

And to install web dependencies, type the following command:

```shell
bower install

```

## Start Server

First, to make your development easy, it's recommended for you to install `nodemon` using `npm`.

```shell
npm install -g nodemon
```

After that, you can start the server using the following command:

```shell
nodemon app.js
```

# Creating Your Apps

## Know Inside

This framework use Express 4.x, and has been integrated to use Jade (for view file) and Passport (for authentication related process). It's also has been configured to properly serve resources with `access_token` authentication using Passport HTTP Bearer. All connected to a MySQL database data source.

## Directory Structure

There are 3 main directories that you can use. There are `controllers`,  `public`, and `views`. The `node_modules` directory is used to save Node.js dependency, so don't mess with it. The `libs` directory contains logic to boot up your server and authenticate request.

### `controllers` Directory

This directory contains all controllers that is used inside your server. Every directory name is also your controller name.

### `views` Directory

This directory contains global views that you can use throughout the server. It contains layout, element and error pages that you can modify according to your needs.

### `public` Directory

This is the public-exposed directory that contains all your static asset like images, JavaScript files, and stylesheet files.

## Installing Web Dependencies

You can install web dependencies using Bower. All dependencies will be installed on `components` sub-directory inside `public` directory. Don't forget to add additional parameter `--save` to ensure that the new dependency will be persisted to `bower.json` file.

## Controllers and Actions

This framework using Controller, and View to serve your apps. First, Controller will control the logic to interact with your data model and serve it to view that can be navigated to user.

To create new controller, you'll need to define a controller function and exports it.

```javascript
function controller = function(args) {
    var actions = {};
    
    // Do something with the actions object.
    
    return actions;
};

module.exports = controller;
```

Every controller has action that each of it representing 1 request and 1 url. 

Let's say you have url list below:

```
GET  /users/login
POST /users/login
POST /api/users/authenticate
```

Then, this can be represented using the following controller:

```javascript
var controller = function(args) {
    var actions = {};
    
    actions.login = [
        {
            method  : 'get',
            path    : '/login',
            handler : function(req, res, next) {
                // Do something here.
            }
        },
        {
            method  : 'post',
            path    : '/login',
            handler : function(req, res, next) {
                // Do something here.
            }
        }
    ];
    
    actions.authenticate = {
        method  : 'post',
        prefix  : 'api',
        path    : 'authenticate',
        handler : function(req, res, next) {
            // Do something here.
        }
    };
};

module.exports = controller;
```

# Feedback

If you've any feedback, or encounter some errors, don't hesitate to put something in Issues Page.
