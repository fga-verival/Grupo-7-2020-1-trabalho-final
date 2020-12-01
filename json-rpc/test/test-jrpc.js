const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
var request = require('request');


chai.use(chaiHttp);

describe('JSON-rpc API tests', () => {

  after(() => {
    process.exit(0);
  });
  
  it('it should return auth error', (done) => {
    chai.request('http://localhost:3003')
			.post('/')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({'jsonrpc':"2.0", "method":"auth", "params":{"pwd":"123"}, "id":123})
      .end((err, res) => {
        chai.expect(res.body).to.have.property('result', 'Not authorized');
        done();
      });
  });

  it('it should return 1', (done) => {
    chai.request('http://localhost:3003')
      .post('/')
      .send({'jsonrpc':"2.0", "method":"simples", "params":{"cpf":"hehe","pwd":"123"}, "id":123})
      .end((err, res) => {
        chai.expect(res).to.have.property('status', 200);
        chai.expect(res.body).to.have.property('result', 1);
        done();
      });
  });

  it('it should return successful authentication', (done) => {
    chai.request('http://localhost:3003')
      .post('/')
      .send({'jsonrpc':"2.0", "method":"auth", "params":{"cpf":"hehe","pwd":"123"}, "id":123})
      .end((err, res) => {
        chai.expect(res).to.have.property('status', 200);
        chai.expect(res.body).to.have.property('result');
        chai.expect(res.body.result).to.have.property('cpf', 'hehe');
        chai.expect(res.body.result).to.have.property('message', 'User authenticated');
        done();
      });
  });

  it('it should return Client object', (done) => {
    chai.request('http://localhost:3003')
      .post('/')
      .send({'jsonrpc':"2.0", "method":"data", "params":{"cpf":"hehe","pwd":"123"}, "id":123})
      .end((err, res) => {
        chai.expect(res).to.have.property('status', 200);
        chai.expect(res.body).to.have.property('result')
        chai.expect(res.body.result).to.have.property('nome', 'João');
        chai.expect(res.body.result).to.have.property('conta', 111);
        done();
      });
  });

});
