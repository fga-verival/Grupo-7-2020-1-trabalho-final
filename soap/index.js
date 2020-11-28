const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser')

var myService = {
    MyService: {
        MyPort: {
            MyFunction: function(args) {
                return {
                    name: args.name
                };
            },
  
            MyAsyncFunction: function(args, callback) {
                callback({
                    name: args.name
                });
            },
  
            HeadersAwareFunction: function(args, cb, headers) {
                return {
                    name: headers.Token
                };
            },
  
            reallyDetailedFunction: function(args, cb, headers, req) {
                console.log('SOAP `reallyDetailedFunction` request from ' + req.connection.remoteAddress);
                return {
                    name: headers.Token
                };
            }
        }
    }
};

var app = express();

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(3000, function(){
    soap.listen(app, '/wsdl', myService ,xml);
});