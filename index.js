const express = require('express');  
const request = require('request');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const port = 3000;

const key = fs.readFileSync(path.resolve('../../Documents/certs/key.pem'));
const cert = fs.readFileSync(path.resolve('../../Documents/certs/certificate.pem'));
const options = {
    key,
    cert,
  };


const apiServerHost = 'https://www.food2fork.com'
const app = express(); 

app.use(cors({
  origin: 'https://localhost:8081',
  optionsSuccessStatus: 200,
}));

app.use('/', function(req, res) {  
  const url = apiServerHost + req.url;
  console.log(req)
  req.pipe(request(url)).pipe(res);
});

// app.listen(process.env.PORT || port);  

var server = https.createServer(options, app);

server.listen(port, () => {
  console.log("server starting on port : " + port)
});