const api = require('./index')
const xmlrpc = require('xmlrpc')
const chai = require('chai');

const should = chai.should();

describe('xmlrpc', () => {
    before(() => {
        return new Promise((resolve) => {
            var clientOptions = {
                host: 'localhost',
                port: 3005,
                path: '/'
            }
            var client = xmlrpc.createClient(clientOptions)
            
        setTimeout(() => {
            
            resolve() 
            }, 200)
        })
    });

    after(() => {
        process.exit(0);
    })
            

    it('should return 1', (done) => {
        console.log('GetOne')
        client.methodCall('getOne', null, function(err, value) {
            
            if(err)
                console.log(err);
            else {
                value.should.be.an('Object');
                value.should.have.property('number').that.is.a('Number').equal(1);
                done();
            }
        });
    })
    
    it('should return user info', (done) => {
        client.methodCall('getNome', null, function(err, value) {
            if(err)
                console.log(err);
            else {
                value.should.be.an('Object');
                value.should.have.property('nome').that.is.a('string').eql('João');
                done();
            }
        })
    })
})