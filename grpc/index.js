const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const server = new grpc.Server();

const packageDefinition = protoLoader.loadSync('api.proto', {
	keepCase: true,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
});

const mock = {
	nome: "João",
	conta: 111,
	saldo: 123,
	transacoes: [
		{
		valor: 123,
		contaDestinatario: 123,
		data: "1/1/2001" 
		},
		
		{
		valor: 132,
		contaDestinatario: 132,
		data: "1/1/2003" 
		},
		
		{
		valor: 321,
		contaDestinatario: 321,
		data: "1/1/2004" 
		}
	],
	contatos: [
		{
		nome: "Maria",
		conta: 123
		},
		
		{
		nome: "Pedro",
		conta: 132
		}
	],
	limite: 400,
	limiteDisponivel: 135,
	valorElegivelParaEmprestimo: 10000,
	pontos: 0
}

server.addService(packageDefinition.APIService, {
	getOne: (_, cb) => {
		cb(null, {number: 1});
	},
	
	getSession: (credentials, cb) => {
		cb(null, {userSession: '123'});
	},
	
	getUserInfo: (userSession, cb) => {
		cb(null, mock);
	},
});
server.bindAsync('localhost:3000', grpc.ServerCredentials.createInsecure(), () => {
	server.start();
	console.log('Server listening at localhost:3000...');
});

module.exports = { server };