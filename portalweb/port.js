const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 8080; // change the port is here

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

app.listen(port, () => {
    console.log(`The server is connected to ${port}`);
});

