const http = require('http');
const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const app = express();
const { exec } = require('child_process');
const port = 4221;

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
  const filePath = path.join(__dirname, 'portalweb/home.html');

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Erreur interne du serveur');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`Serveur HTTP écoutant sur le port ${port}`);
  
  // exec(`start http://localhost:${port}`); // start localhost url + port only
});
