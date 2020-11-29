const chai = require('chai');

const should = chai.should();
let chaiHttp = require('chai-http');
let server = require('../index');
chai.use(chaiHttp);

describe('/POST 3001', () => {
    it('it should return 1', (done) => {
        let query = {
            query: "{ test1 }"
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('test1').eql(1);
            done();
          });
    });

    it('it should return user_session', (done) => {
        let query = {
            query: '{ login(email: "abc", senha: "abc") }'
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('login').eql("123213");
            done();
          });
    });

    it('it should return User', (done) => {
        let query = {
            query: `{ getUser(auth:"asdasd") {
                nome
                conta
                saldo
              }}`
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('getUser');
                res.body.data.getUser.should.have.property('nome').eql("João");
                res.body.data.getUser.should.have.property('conta').eql(111);
                res.body.data.getUser.should.have.property('saldo').eql(123);
            done();
          });
    });

    it('it should return transactions', (done) => {
        let query = {
            query: `{ getTransacao(auth:"asdasd") {
                valor
                contaDestinatario
                data
              }}`
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('getTransacao').eql([
                    {
                      "valor": 123,
                      "contaDestinatario": 123,
                      "data": "1/1/2001"
                    },
                    {
                      "valor": 132,
                      "contaDestinatario": 132,
                      "data": "1/1/2003"
                    },
                    {
                      "valor": 321,
                      "contaDestinatario": 321,
                      "data": "1/1/2004"
                    }
                  ]);
            done();
          });
    });

    it('it should return contacts', (done) => {
        let query = {
            query: `{ getContato(auth:"asdasd") {
                nome
                conta
              }}`
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('getContato').eql([
                    {
                      "nome": "Maria",
                      "conta": 123
                    },
                    {
                      "nome": "Pedro",
                      "conta": 132
                    }
                  ]);
            done();
          });
    });

    it('it should return limit', (done) => {
        let query = {
            query: `{ getLimite(auth:"asdasd") {
                limite
                limiteDisponivel
              }}`
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('getLimite').eql({
                    "limite": 400,
                    "limiteDisponivel": 135
                  });
            done();
          });
    });

    it('it should return emprestimo', (done) => {
        let query = {
            query: `{ getEmprestimo(auth:"asdasd") {
                valorElegivelParaEmprestimo
              }}`
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('getEmprestimo').eql({
                    "valorElegivelParaEmprestimo": 10000
                  });
            done();
          });
    });


    it('it should return pontos', (done) => {
        let query = {
            query: `{getPontos(auth:"asdasd") {
                pontos
              }}`
        }
      chai.request(server)
          .post('/graphql')
          .send(query)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.have.property('getPontos').eql({
                    "pontos": 0
                  });
            done();
          });
    });

});