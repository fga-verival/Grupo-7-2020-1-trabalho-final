var url = 'http://localhost:3000/wsdl?wsdl';
var args = { name: 'Pintão' };
const soap = require('soap');
const chai = require('chai');
const express = require('express');
const bodyParser = require('body-parser')
const data = require('./mock')

const should = chai.should();

describe('soap', () => {
    let client;

    before(() => {
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

        var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

        app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));

        app.listen(3000, function () {
            soap.listen(app, '/wsdl', myService, xml);
        });
    });

    it('should return 1', (done) => {
        soap.createClient(url, function (err, client) {
            client.getOne(function (err, result) {
                result.should.be.an('Object');
                result.should.have.property('number').that.is.a('number').equal(1);
                done();
            });
        });
    }).timeout(5000);

    it('should return user session', (done) => {
        soap.createClient(url, function (err, client) {
            client.login(args, function (err, result) {
                result.should.be.an('Object');
                result.should.have.property('user_session').that.is.a('string').equal('123456');
                done();
            });
        });
    }).timeout(5000);

    it('should return user info', (done) => {
        soap.createClient(url, function (err, client) {
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
});