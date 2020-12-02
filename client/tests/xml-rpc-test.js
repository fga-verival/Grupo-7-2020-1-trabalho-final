const xmlRpcServer = require('../../xml-rpc/index')
const xmlrpc = require('xmlrpc')
const chai = require('chai');

const should = chai.should();

describe('xmlrpc', () => {
    var client
    
    before((done) => {
        var clientOptions = {
            host: 'localhost',
            port: 3005,
            path: '/'
        }
        client = xmlrpc.createClient(clientOptions)

        client.methodCall('getOne', null, function(err, value) {
            
            if(err)
                console.log(err);
            else {
                done();
            }
        });
    })

    it('Unit', (done) => {
        client.methodCall('getOne', null, function(err, value) {
            
            if(err)
                console.log(err);
            else {
                value.should.be.a('Number').eql(1);
            done();
            }
        });
    })

    it('Complete Info', (done) => {
        client.methodCall('getUserSession', null, function(err, value) {
            if(err)
                console.log(err)
            else {
                client.methodCall('getUserInfo', null, function(err, value) {
                    if(err)
                        console.log(err);
                    else {
                        value.should.be.an('Object');
                        value.should.have.property('nome').that.is.a('string').equal('João');
                        value.should.have.property('conta').that.is.a('Number').equal(111);
                        value.should.have.property('saldo').that.is.a('Number').equal(123);
                        value.should.have.property('transacoes').that.is.an('Array').that.has.lengthOf(3);
                        value.should.have.property('contatos').that.is.an('Array').that.has.lengthOf(2);
                        value.should.have.property('limite').that.is.an('Number').equal(400);
                        value.should.have.property('limiteDisponivel').that.is.an('Number').equal(135);
                        value.should.have.property('valorElegivelParaEmprestimo').that.is.an('Number').equal(10000);
                        value.should.have.property('pontos').that.is.an('Number').equal(0);
                        done();
                    }
                });
            }
        });


    });
});