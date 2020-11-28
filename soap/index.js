const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser')

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

var myService = {
    MyService: {
        MyPort: {
            getOne: function (args) {
                return {number: 1};
            },

            login: function (args) {
                return {user_session: "123456"};
            },

            getUser: function (args) {
                return mock
            },
        }
    }
};

var app = express();

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

app.use(bodyParser.raw({ type: function () { return true; }, limit: '5mb' }));

app.listen(3000, function () {
    soap.listen(app, '/wsdl', myService, xml);
});