const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser')
const data = require('./mock')

var myService = {
	MyService: {
		MyPort: {
			getOne: function (args) {
				return { number: 1 };
			},

			login: function (args) {
				return { user_session: "123456" };
			},

			getUser: function (args) {
				return data.mock
			},
		}
	}
};

var app = express();

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));

app.listen(3000, function () {
	soap.listen(app, '/wsdl', myService, xml);
});