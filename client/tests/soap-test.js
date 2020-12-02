const chai = require('chai');
const bodyParser = require('body-parser');
const express = require('express');
const soap = require('soap');
const data = require('../mock');

var args = { name: 'Sample', password: '12345' };
var url = 'http://localhost:3000/wsdl?wsdl';

const should = chai.should();

describe('soap', () => {

    before((done) => {
        var myService = {
            MyService: {
                MyPort: {
                    getOne: function () {
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

        var xml = require('fs').readFileSync('./myservice.wsdl', 'utf8');

        app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));

        app.listen(3000, function () {
            soap.listen(app, '/wsdl', myService, xml);
        });

        soap.createClient(url, function (err, client) {
            client.getOne(function (err, result) {
                done();
            });
        });

    });

    it('Unit', (done) => {
        soap.createClient(url, function (err, client) {
            client.getOne(function (err, result) {
                result.should.be.an('Object');
                result.should.have.property('number').that.is.a('number').equal(1);
                done();
            });
        });
    }).timeout(5000);

    it('Complete Info', (done) => {
        soap.createClient(url, function (err, client) {
            client.login(args, function (err, result) {
                result.should.be.an('Object');
                result.should.have.property('user_session').that.is.a('string').equal('123456');

            });
            client.getUser(args, function (err, result) {
                result.should.be.an('Object');
                result.should.have.property('nome').that.is.a('string').equal('João');
                result.should.have.property('conta').that.is.a('number').equal(111);
                result.should.have.property('saldo').that.is.a('number').equal(123);
                result.should.have.property('transacoes').that.is.an('Object');
                result.should.have.property('contatos').that.is.an('Object');
                result.should.have.property('limite').that.is.an('number').equal(400);
                result.should.have.property('limiteDisponivel').that.is.an('number').equal(135);
                result.should.have.property('valorElegivelParaEmprestimo').that.is.an('number').equal(10000);
                result.should.have.property('pontos').that.is.an('number').equal(0);
                done();
            });
        });
    }).timeout(5000);

    function unitTest() {
		return new Promise((resolve, reject) => {
			soap.createClient(url, function (err, client) {
                client.getOne(function (err, result) {
                    result.should.have.property('number').that.is.a('number').equal(1);
                    resolve();
                });
            });
		});
	}

	function completeTest() {
		return new Promise((resolve, reject) => {
			soap.createClient(url, function (err, client) {
                client.login(args, function (err, result) {
                    result.should.have.property('user_session').that.is.a('string').equal('123456');
    
                });
                client.getUser(args, function (err, result) {
                    result.should.have.property('valorElegivelParaEmprestimo').that.is.an('number').equal(10000);
                    resolve();
                });
            });
		});
	}

	it('Scaled Unit', (done) => {
		let testsDone = 0;
		for(let i=0; i<1000; i++) {
			unitTest().then(() => {
				testsDone++;
				if(testsDone == 1000) {
					done();
				}			
			});
		}
	}).timeout(5000);

	it('Scaled Complete Info', (done) => {
		let testsDone = 0;
		for(let i=0; i<1000; i++) {
			completeTest().then(() => {
				testsDone++;
				if(testsDone == 1000) {
					done();
				}			
			});
		}
	}).timeout(5000);
});