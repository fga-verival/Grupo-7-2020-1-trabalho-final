const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../json-rpc/index');


chai.use(chaiHttp);

describe('JSON-rpc API tests', () => {

    before((done) => {
        chai.request('http://localhost:3003')
            .post('/')
            .send({ 'jsonrpc': "2.0", "method": "simples", "params": { "cpf": "hehe", "pwd": "123" }, "id": 123 })
            .end((err, res) => {
                done();
            });
    })

    it('Unit', (done) => {
        chai.request('http://localhost:3003')
            .post('/')
            .send({ 'jsonrpc': "2.0", "method": "simples", "params": { "cpf": "hehe", "pwd": "123" }, "id": 123 })
            .end((err, res) => {
                chai.expect(res).to.have.property('status', 200);
                chai.expect(res.body).to.have.property('result', 1);
                done();
            });
    });

    it('Complete Info', (done) => {
        chai.request('http://localhost:3003')
            .post('/')
            .send({ 'jsonrpc': "2.0", "method": "auth", "params": { "cpf": "hehe", "pwd": "123" }, "id": 123 })
            .end((err, res) => {
                chai.expect(res.body.result).to.have.property('message', 'User authenticated');
                chai.request('http://localhost:3003')
                    .post('/')
                    .send({ 'jsonrpc': "2.0", "method": "data", "params": { "cpf": "hehe", "pwd": "123" }, "id": 123 })
                    .end((err, res) => {
                        chai.expect(res).to.have.property('status', 200);
                        chai.expect(res.body).to.have.property('result')
                        chai.expect(res.body.result).to.have.property('nome', 'João');
                        chai.expect(res.body.result).to.have.property('conta', 111);
                        done();
                    });
            });
    });

});