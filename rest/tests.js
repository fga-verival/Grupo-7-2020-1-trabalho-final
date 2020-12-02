const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./index');


chai.use(chaiHttp);

describe('API tests', () => {

  after(() => {
    process.exit(0);
  });
  
  it('it should return auth error', (done) => {
    chai.request('http://localhost:3004')
			.get('/clients')
      .end((err, res) => {
				console.log(res.body)
        chai.expect(res).to.have.property('status', 401);
        chai.expect(res.body).to.have.property('message', 'User does not have permission.');
        chai.expect(res.body).to.have.property('code', '401');
        done();
      });
  });

  it('it should return 1', (done) => {
    chai.request('http://localhost:3004')
      .get('/simple')
      .end((err, res) => {
        chai.expect(res).to.have.property('status', 200);
        chai.expect(res.body).to.have.property('teste1', 1);
        done();
      });
  });

  it('it should return successful authentication', (done) => {
    let header = {
      cpf: 123456789,
      senha: '123'
    }
    chai.request('http://localhost:3004')
      .post('/auth')
			.set({'cpf': 123456789, 'senha': '123'})
      .end((err, res) => {
        chai.expect(res).to.have.property('status', 200);
        chai.expect(res.body).to.have.property('message', 'User authenticated');
        chai.expect(res.body).to.have.property('code', '200');
        done();
      });
  });

  it('it should return unsuccessful authentication', (done) => {
    chai.request('http://localhost:3004')
      .post('/auth')
			.set({'cpf': 123456789, 'senha': '13'})
      .end((err, res) => {
        chai.expect(res).to.have.property('status', 401);
        chai.expect(res.body).to.have.property('message', 'Wrong password');
        chai.expect(res.body).to.have.property('code', '401');
        done();
      });
  });

  it('it should return Client object', (done) => {
    chai.request('http://localhost:3004')
			.get('/clients')
      .end((err, res) => {
        chai.expect(res).to.have.property('status', 200);
        chai.expect(res.body).to.have.property('nome', 'João');
        chai.expect(res.body).to.have.property('cpf', 123456789);
        done();
      });
  });

});
