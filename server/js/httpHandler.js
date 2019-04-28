const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.router = (req, res, next = () => {}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  switch (req.method) {
    case 'GET':
      if (req.url === '/') {
        res.writeHead(200, headers);
        res.end(messageQueue.dequeue());

      }

      if (req.url === '/?command=random') {
        res.writeHead(200, headers);
        res.end(generateRandom());

      }

      if (req.url === '/background.jpg') {
        fs.readFile(module.exports.backgroundImageFile, (err, data) => {
          if (err) {
            res.writeHead(404, headers);
            res.end();
          } else {
            res.writeHead(200, headers);
            res.write(data, 'binary');
            res.end();
          }
        });
      }
      break;

    case 'POST':
      if (req.url === '/background.jpg') {
        var imageFile = Buffer.alloc(0);
        req.on('data', chunk => {
          imageFile = Buffer.concat([imageFile, chunk]);
        });
        req.on('end', ()=> {
          var imageData = multipart.getFile(imageFile);
          fs.writeFile(module.exports.backgroundImageFile, imageData, () => {
            res.writeHead(201, headers);
            res.write(module.exports.backgroundImageFile);
            res.end();
          });

        });


      }
      break;

    case 'OPTIONS':
      res.writeHead(200, headers);
      res.end();
      break;
    default:
      break;
  }

  next();
};

var generateRandom = () => {
  var options = ['up', 'down', 'left', 'right'];
  var i = Math.floor(Math.random() * 4);
  return options[i];
};