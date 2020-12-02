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
                        chai.expect(res.body).to.have.property('cpf', 123456789);
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
                        chai.expect(res.body).to.have.property('cpf', 123456789);
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
