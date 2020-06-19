const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  console.log('Request for ' + req.url + ' by method ' + req.method);

  if (req.method == 'GET') {
    var fileUrl; //declared varibale
    if (req.url == '/') fileUrl = '/index.html'; //if no specific url is requested show user index.html
    else fileUrl = req.url;

    var filePath = path.resolve('./public'+fileUrl); //resolves path to an absolute path that is the file should be within public folder
    const fileExt = path.extname(filePath); //find the extension of file
    if (fileExt == '.html') {               //check if extension is html
      fs.exists(filePath, (exists) => {
        if (!exists) {                     // if no html file exits
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><body><h1>Error 404: ' + fileUrl +
                      ' not found</h1></body></html>');
          return;
        }
        res.statusCode = 200;               //if it exists
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res); //read the contents of the file and pipe it and send the content
      });
    }
    else { //if file extension is not html
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + fileUrl +
              ' not a HTML file</h1></body></html>');
    }
  }
  else { //if request method is post
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html');
      res.end('<html><body><h1>Error 404: ' + req.method +
              ' not supported</h1></body></html>');
  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
