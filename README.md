# file-server
Node.js file server to retrieve static files over http

## Operations

GET /
List all the files

GET /<file-name>
Get content of a particular file

## Options

To set a folder path set env variable
```
FILE_SERVER_PATH=/path/to/folder
```

To set server port
```
FILE_SERVER_PORT=8080
```