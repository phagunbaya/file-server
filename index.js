/**
 * Created by phagunbaya on 05/05/17.
 */

var fs      = require('fs');
var walk    = require('walk');
var log4js  = require('log4js');
var express = require('express');
var http    = require('http');

var log        = log4js.getLogger();
var folder     = process.env['FILE_SERVER_PATH'] || '/static';
var http_port  = parseInt(process.env['FILE_SERVER_PORT']) || 8080;

function start() {
  var expressInstance = express();
  var application = http.createServer(expressInstance);
  expressInstance.use(express.static(folder));
  expressInstance.get('/', function(req, res, next){
    var files = [];
    var walker  = walk.walk(folder, { followLinks: false });

    walker.on('file', function(root, stat, next) {
      files.push({
        "time": stat.birthtime.getTime(),
        "name": stat.name,
        "size": stat.size
      });
      return next();
    });

    walker.on('error', function(err){
      log.error("Error getting list of files: "+err);
      res.status(500).send({"message": "Internal server error"});
      return next();
    });

    walker.on('end', function() {
      log.info("Found "+files.length+" files");
      res.status(200).send(files);
      return next();
    });
  });
  application.listen(http_port, function(){
    log.info("Server start at http://localhost:"+http_port);
  });
}

start();