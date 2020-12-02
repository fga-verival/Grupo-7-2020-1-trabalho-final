const chai = require('chai');
const chaiHttp = require('chai-http');
const graphqlServer = require('../../graphql/index');
const express = require('express');
const should = chai.should();

chai.use(chaiHttp);


describe('graphql', () => {

    before((done) => {
        let query = {
            query: "{ test1 }"
        }
        chai.request(graphqlServer)
            .post('/graphql')
            .send(query)
            .end((err, res) => {
                done();
            });
    });

    it('Unit', (done) => {
        let query = {
            query: "{ test1 }"
        }
        chai.request(graphqlServer)
            .post('/graphql')
            .send(query)
            .end((err, res) => {
                res.body.data.should.have.property('test1').eql(1);
                done();
            });
    });

    it('Complete Info', (done) => {
        let query = {
            query: '{ login(email: "abc", senha: "abc") }'
        }

        chai.request(graphqlServer)
            .post('/graphql')
            .send(query)
            .end((err, res) => {
                query = {
                    query: `{
                        getUser(auth:"asdasd") {
                          nome
                          conta
                          saldo
                        }
                        getTransacao(auth:"asdasd") {
                            valor
                            contaDestinatario
                            data
                        }
                        getContato(auth:"asdasd") {
                            nome
                            conta
                        }
                        getLimite(auth:"asdasd") {
                            limite
                            limiteDisponivel
                        }
                        getEmprestimo(auth:"asdasd") {
                            valorElegivelParaEmprestimo
                        }
                        getPontos(auth:"asdasd") {
                            pontos
                      }
                    }`
                }

                chai.request(graphqlServer)
                    .post('/graphql')
                    .send(query)
                    .end((err, res) => {
                        res.body.data.getUser.should.have.property('nome').eql("João");
                        res.body.data.getUser.should.have.property('conta').eql(111);
                        res.body.data.getUser.should.have.property('saldo').eql(123);

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

                        res.body.data.should.have.property('getLimite').eql({
                            "limite": 400,
                            "limiteDisponivel": 135
                        });

                        res.body.data.should.have.property('getEmprestimo').eql({
                            "valorElegivelParaEmprestimo": 10000
                        });

                        res.body.data.should.have.property('getPontos').eql({
                            "pontos": 0
                        });


                        done();
                    });
            });
    });

});