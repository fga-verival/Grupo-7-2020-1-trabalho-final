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
                        chai.expect(res.body.result).to.have.property('saldo', 123);
                        chai.expect(res.body.result).to.have.property('transacoes').that.is.an('Array').that.has.lengthOf(3);
                        chai.expect(res.body.result).to.have.property('contatos').that.is.an('Array').that.has.lengthOf(2);
                        chai.expect(res.body.result).to.have.property('limite', 400);
                        chai.expect(res.body.result).to.have.property('limiteDisponivel', 135);
                        chai.expect(res.body.result).to.have.property('valorElegivelParaEmprestimo', 10000);
                        chai.expect(res.body.result).to.have.property('pontos', 0);
                        done();
                    });
            });
    });

    function unitTest() {
		return new Promise((resolve, reject) => {
			chai.request('http://localhost:3003')
            .post('/')
            .send({ 'jsonrpc': "2.0", "method": "simples", "params": { "cpf": "hehe", "pwd": "123" }, "id": 123 })
            .end((err, res) => {
                chai.expect(res.body).to.have.property('result', 1);
                resolve();
            });
		});
	}

	function completeTest() {
		return new Promise((resolve, reject) => {
			chai.request('http://localhost:3003')
            .post('/')
            .send({ 'jsonrpc': "2.0", "method": "auth", "params": { "cpf": "hehe", "pwd": "123" }, "id": 123 })
            .end((err, res) => {
                chai.expect(res.body.result).to.have.property('message', 'User authenticated');
                chai.request('http://localhost:3003')
                    .post('/')
                    .send({ 'jsonrpc': "2.0", "method": "data", "params": { "cpf": "hehe", "pwd": "123" }, "id": 123 })
                    .end((err, res) => {
                        chai.expect(res.body.result).to.have.property('conta', 111);
                        resolve();
                    });
            });
		});
	}

	it('Scaled Unit', (done) => {
		let testsDone = 0;
		for(let i=0; i<1000; i++) {
			unitTest().then(() => {
				testsDone++;
				if(testsDone == 1000) {
					done();
				}			
			});
		}
	}).timeout(5000);

	it('Scaled Complete Info', (done) => {
		let testsDone = 0;
		for(let i=0; i<1000; i++) {
			completeTest().then(() => {
				testsDone++;
				if(testsDone == 1000) {
					done();
				}			
			});
		}
	}).timeout(5000);

});