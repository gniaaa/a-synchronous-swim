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

      } else if (req.url === '/?command=random') {
        res.writeHead(200, headers);
        res.end(generateRandom());

      } else if (req.url[0] !== '/') {
        console.log('trying a legit file');
        fs.readFile(`../spec/water-lg.jpg`, function read(err, data) {
          console.log('err is', err);
          console.log('data is', data);
        });
        
        
        fs.readFile(`../${req.url}`, function read(err, data) {
          console.log('err is', err);
          console.log('data is', data);
        });
      }
      break;

    case 'POST':
      break;

    case 'OPTIONS':
      res.writeHead(200, headers);
      res.end();
      break;
    default:
      break;
  }
};

var generateRandom = () => {
  var options = ['up', 'down', 'left', 'right'];
  var i = Math.floor(Math.random() * 4);
  return options[i];
}