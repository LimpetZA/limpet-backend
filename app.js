const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const { ApolloServer } = require('apollo-server');

const DatabaseAdapter = require('./db/DatabaseAdapter')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


const debug = require('debug')('limpet:server');




class Application {
  constructor() {
    this.configDir = 'config'
    this.configPath = path.join(__dirname, this.configDir, 'config.json')
    this.secretPath = path.join(__dirname, this.configDir, 'secret.json')
    this.modules = []
    this.status = {
      modules: this.modules
    }
    this.port = 3000
  }

  static createApplication() {
    const instance = new Application
    // bind functions to application context
    const $ = (func) => func.bind(instance)
    return Promise.resolve(instance)
      //.then($(instance.arguments))
      .then($(instance.logger))
      .then($(instance.config))
      .then($(instance.database))
      .then($(instance.gql))
      //.then($(instance.express))
      .catch((e) => {
        instance.log.fatal(e, 'Error during start up.')
        process.exit(1)
      })
      .then($(instance.listen))
      .catch(e => instance.log.error(e, 'Uncaught expection during application runtime'))
  }
  logger() {
    this.log = {
      info: (...e) =>  console.log(e),
      error: (...e) => console.error(e),
      fatal: (...e) => console.error(e)
    }
  }
  config() {}

  async database() {
    this.dbAdapter = new DatabaseAdapter("limpet_dev_server")
    //console.log(await this.dbAdapter.init())
    //await this.dbAdapter.insertDoc("test_doc", { "Some": "fucken", really: ["cool", "data"] })
    const docs = await this.dbAdapter.getDocsByField("site", "Brakpan")
    //console.log(docs.data)
  }

  gql() {
    const { typeDefs, resolvers } = require('./schema/SpeciesGQL')
    this.server = new ApolloServer({ typeDefs, resolvers })
    //console.log(this.server)
    this.server.playgroundOptions.settings['editor.cursorShape'] = 'block'
  }

  // express() {
  //   this.app = express();
  //   const { app } = this

  //   app.use(logger('dev'));
  //   app.use(express.json());
  //   app.use(express.urlencoded({
  //     extended: false
  //   }));

  //   app.use(cookieParser());
  //   app.use(sassMiddleware({
  //     src: path.join(__dirname, 'public'),
  //     dest: path.join(__dirname, 'public'),
  //     indentedSyntax: true, // true = .sass and false = .scss
  //     sourceMap: true
  //   }));

  //   app.use(express.static(path.join(__dirname, 'public')));
  //   app.use('/', indexRouter);
  //   app.use('/users', usersRouter);

  // }

  listen() {
    //var port = this.normalizePort(process.env.PORT || '3000');
    this.server.listen(this.port);
    this.log.info(`Started on port ${this.port}`)
  }

}




// /**
//  * Event listener for HTTP server "error" event.
//  */


// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string' ?
//     'Pipe ' + port :
//     'Port ' + port;
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string' ?
//     'pipe ' + addr :
//     'port ' + addr.port;
//   debug('Listening on ' + bind);
// }


const app = Application.createApplication()