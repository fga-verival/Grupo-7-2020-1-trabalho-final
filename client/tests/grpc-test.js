const api = require('../../grpc/index');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const chai = require('chai');

const should = chai.should();

describe('gRPC', () => {
	let client;

	before(() => {
		const packageDefinition = protoLoader.loadSync('api.proto', {
			keepCase: true,
			longs: String,
			enums: String,
			defaults: true,
			oneofs: true
		});
		const APIService = grpc.loadPackageDefinition(packageDefinition).APIService;
		client = new APIService('localhost:3000', grpc.credentials.createInsecure());
	});

	after(() => {
		api.server.forceShutdown();
	});

	it('Unit', (done) => {
		client.getOne({}, (err, res) => {
			if (err)
				console.log(err);
			else {
				res.should.be.an('Object');
				res.should.have.property('number').that.is.a('Number').equal(1);
				done();
			}
		});
	}).timeout(5000);

	it('Complete Info', (done) => {
		client.getSession({ email: "a@a.a", password: "aaa" }, (err, res) => {
			if (err)
				console.log(err);
			else {
				client.getUserInfo({ userSession: '123' }, (err, res) => {
					if (err)
						console.log(err);
					else {
						res.should.be.an('Object');
						res.should.have.property('nome').that.is.a('string').equal('João');
						res.should.have.property('conta').that.is.a('Number').equal(111);
						res.should.have.property('saldo').that.is.a('Number').equal(123);
						res.should.have.property('transacoes').that.is.an('Array').that.has.lengthOf(3);
						res.should.have.property('contatos').that.is.an('Array').that.has.lengthOf(2);
						res.should.have.property('limite').that.is.an('Number').equal(400);
						res.should.have.property('limiteDisponivel').that.is.an('Number').equal(135);
						res.should.have.property('valorElegivelParaEmprestimo').that.is.an('Number').equal(10000);
						res.should.have.property('pontos').that.is.an('Number').equal(0);
						done();
					}
				});
			}
		});
	}).timeout(5000);
});