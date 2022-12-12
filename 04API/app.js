/**
 * # app.js
 * @author: jetbrains
 * @author: Jaime A. Mendez M. <jam65st@gmail.com> (updates 20221209)
 */

const express      = require( 'express' ),
      path         = require( 'path' ),
      // bodyParser   = require( 'body-parser' ),
      cookieParser = require( 'cookie-parser' ),
      logger       = require( 'morgan' ),
      cors         = require( 'cors' ),
      indexRouter  = require( './application/routes/index' ),
      usersRouter  = require( './application/routes/users' ),
      apiRouter    = require( './application/routes/api' ),
      app          = express();

app.use( logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded( { extended: false } ) );
app.use( cors() );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( '/', indexRouter );
app.use( '/users', usersRouter );
app.use( '/api', apiRouter );

module.exports = app;
