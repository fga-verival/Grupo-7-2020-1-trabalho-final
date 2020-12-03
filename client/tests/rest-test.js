const chai = require('chai');
const chaiHttp = require('chai-http');
const restServer = require('../../rest/index');

chai.use(chaiHttp);

describe('Rest', () => {

    before((done) => {
        chai.request('http://localhost:3004')
            .get('/simple')
            .end((err, res) => {
                done();
            });
    })

    it('Unit', (done) => {
        chai.request('http://localhost:3004')
            .get('/simple')
            .end((err, res) => {
                chai.expect(res.body).to.have.property('teste1', 1);
                done();
            });
    });

    it('Complete Info', (done) => {
        chai.request('http://localhost:3004')
            .post('/auth')
            .set({ 'cpf': 123456789, 'senha': '123' })
            .end((err, res) => {
                chai.expect(res.body).to.have.property('message', 'User authenticated');
                chai.request('http://localhost:3004')
                    .get('/clients')
                    .end((err, res) => {
                        chai.expect(res.body).to.have.property('nome', 'João');
                        chai.expect(res.body).to.have.property('conta', 111);
                        chai.expect(res.body).to.have.property('saldo', 123);
                        chai.expect(res.body).to.have.property('transacoes').that.is.an('Array').that.has.lengthOf(3);
                        chai.expect(res.body).to.have.property('contatos').that.is.an('Array').that.has.lengthOf(2);
                        chai.expect(res.body).to.have.property('limite', 400);
                        chai.expect(res.body).to.have.property('limiteDisponivel', 135);
                        chai.expect(res.body).to.have.property('valorElegivelParaEmprestimo', 10000);
                        chai.expect(res.body).to.have.property('pontos', 0);
                        done();
                    });

            });
    });

    function unitTest() {
        return new Promise((resolve, reject) => {
            chai.request('http://localhost:3004')
            .get('/simple')
            .end((err, res) => {
                chai.expect(res.body).to.have.property('teste1', 1);
                resolve();
            });
        });
    }

    function completeTest() {
        return new Promise((resolve, reject) => {
            chai.request('http://localhost:3004')
            .post('/auth')
            .set({ 'cpf': 123456789, 'senha': '123' })
            .end((err, res) => {
                chai.expect(res.body).to.have.property('message', 'User authenticated');
                chai.request('http://localhost:3004')
                    .get('/clients')
                    .end((err, res) => {
                        chai.expect(res.body).to.have.property('valorElegivelParaEmprestimo', 10000);
                        resolve();
                    });

            });
        });
    }

    it('Scaled Unit', (done) => {
        let testsDone = 0;
        for (let i = 0; i < 1000; i++) {
            unitTest().then(() => {
                testsDone++;
                if (testsDone == 1000) {
                    done();
                }
            });
        }
    }).timeout(5000);

    it('Scaled Complete Info', (done) => {
        let testsDone = 0;
        for (let i = 0; i < 1000; i++) {
            completeTest().then(() => {
                testsDone++;
                if (testsDone == 1000) {
                    done();
                }
            });
        }
    }).timeout(5000);

});
