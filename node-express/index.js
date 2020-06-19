const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); //root folder is public from where static files will be retrieved
app.use(bodyParser.json()); //

app.use('/dishes', dishRouter); // any request coming for /dishes will be handled by dishrouter
app.use('/dishes/:dishId', dishRouter);

app.use('/promotions', promoRouter); // any request coming for /promotions will be handled by dishrouter
app.use('/promotions/:promoId', promoRouter);

app.use('/leaders', leaderRouter); // any request coming for /promotions will be handled by dishrouter
app.use('/leaders/:leaderId', leaderRouter);

app.use((req, res, next) => { //'next' parameter is the middleware that express uses
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
