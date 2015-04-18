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

You can install web dependencies using Bower. All dependencies will be installed on `components` sub-directory inside `public` directory.

## Controllers and Actions

This framework using Controller, and View to serve your apps. First, Controller will control the logic to interact with your data model and serve it to view that can be navigated to user.

To create new controller, you'll need to define a controller function and exports it.

# Tutorial: Simple Blog

Let's say you want to create a new controller called Posts Controller that can view all posts inside a table named `posts`, then you'll do the following step.

First, create new directory inside `controllers` directory and create a sub-directory named `posts`. Remember that your directory name also define your controller name. You can change it later using `name` property for `actions` object that we'll cover later, but for now, let's do this. Your controller file name must be the same to your directory, and suffixed with `_controller`.  

```javascript
/* File: controllers/posts/posts_controller.js */
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
```

After that, create a view file inside `views` directory that you should put inside your `controller/posts` directory. Every controller has its own `views` directory.

```
/* File: controller/posts/views/index.jade */

h1 Posts
each post in posts
    h2 post.title
    p post.content

```

