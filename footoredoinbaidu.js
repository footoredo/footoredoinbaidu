const http = require('http')
const url = require('url')

var site = "http://footoredo.in"

var server = http.createServer(function(req, res) {
    if (req.method != 'GET')
      res.end('Oops!')

    var options = {
      hostname: site,
      port: 80,
      path: url.parse(req.url, true).path,
      method: 'GET'
    }
    console.log(options)

    http.get(site + url.parse(req.url, true).path, function(_res) {
        res.writeHead(200,_res.headers)
        //_res.pipe(res) 
        _res.on('data', function(chunk) {
          res.write(chunk)
          })
        _res.on('end', function() {
          res.end()
          })
      }).on('error',function(e) {
        console.log("Got error: " + e.message);
        })
    
    })
server.listen(8000)
