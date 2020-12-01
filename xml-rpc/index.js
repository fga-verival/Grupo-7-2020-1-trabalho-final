const xmlrpc = require('xmlrpc')

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

var serverOptions = {
  host: 'localhost',
  port: 3005
}


var server = xmlrpc.createServer(serverOptions)

server.on('getOne', function(err, params, callback) {
  callback(null, 1)
})

server.on('getUserSession', function(err, params, callback) {
  callback(null, 123)
})

server.on('getUserInfo', function(err, params, callback) {
  callback(null, mock)
})

module.exports = { server }