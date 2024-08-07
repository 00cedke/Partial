const http = require('http');
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const { exec } = require('child_process');
const port = 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.php');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Error server');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`The server started on port ${port}`);
});
